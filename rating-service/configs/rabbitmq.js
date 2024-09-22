const amqplib = require('amqplib')
const { Rating } = require('../models')

const groupId = 'rating-group'

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

    const exchange2 = await channel.assertExchange('complete_order', 'fanout', { durable: false })
    const queue2 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue2.queue, exchange2.exchange, groupId)

    channel.consume(queue2.queue, async message => {
      const order = JSON.parse(message.content.toString())
      new Set(order.items.map(e => e.product)).forEach(e => Rating.create({ user: order.user, product: e, status: "Pending" }))
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