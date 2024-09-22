const amqplib = require('amqplib')
const { Order } = require('../models')

const groupId = 'order-group'

class RabbitMQ {
  #channel

  async connect() {
    const connection = await amqplib.connect(process.env.RABBITMQ_URI)
    const channel = await connection.createChannel()

    connection.on('close', () => {
      console.error('RabbitMQ connection closed, reconnecting...');
      setTimeout(() => this.connect(), 1000)
    })

    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err);
      setTimeout(() => this.connect(), 1000)
    })

    const exchange2 = await channel.assertExchange('pay_order', 'fanout', { durable: false })
    const queue2 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue2.queue, exchange2.exchange, groupId)

    const exchange3 = await channel.assertExchange('ship_order', 'fanout', { durable: false })
    const queue3 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue3.queue, exchange3.exchange, groupId)

    const exchange4 = await channel.assertExchange('revoke_pay_order', 'fanout', { durable: false })
    const queue4 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue4.queue, exchange4.exchange, groupId)

    const exchange5 = await channel.assertExchange('ship_done', 'fanout', { durable: false })
    const queue5 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue5.queue, exchange5.exchange, groupId)

    channel.consume(queue2.queue, async message => {
      const { order } = JSON.parse(message.content.toString())
      await Order.findOneAndUpdate({ _id: order, status: "Created" }, { status: 'Paid' })
      channel.ack(message)
    })

    channel.consume(queue3.queue, async message => {
      const { order } = JSON.parse(message.content.toString())
      await Order.findOneAndUpdate({ _id: order, status: "Paid" }, { status: 'Shipping' })
      channel.ack(message)
    })

    channel.consume(queue4.queue, async message => {
      const { order } = JSON.parse(message.content.toString())
      await Order.findOneAndUpdate({ _id: order, status: "Paid" }, { status: 'Created' })
      channel.ack(message)
    })

    channel.consume(queue5.queue, async message => {
      const { order: id } = JSON.parse(message.content.toString())
      const order = await Order.findById(id)
      this.produce('complete_order', order)
      await order.updateOne({ status: "Done" })
      channel.ack(message)
    })

    this.#channel = channel
    console.log('Connected RabbitMQ', process.env.RABBITMQ_URI)

  }

  produce(topic, message) {
    this.#channel.publish(topic, '', Buffer.from(JSON.stringify(message)))
  }
}


module.exports = new RabbitMQ()