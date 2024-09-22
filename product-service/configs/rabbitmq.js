const amqplib = require('amqplib')
const { Product } = require('../models')
const { redis } = require('./redis')

const groupId = 'product-group'

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

    const exchange2 = await channel.assertExchange('create_order', 'fanout', { durable: false })
    const queue2 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue2.queue, exchange2.exchange, groupId)

    channel.consume(queue2.queue, async message => {
      JSON.parse(message.content.toString()).items.forEach(async item => {
        await Product.findByIdAndUpdate(item.product, { $inc: { inventoryAmount: -Number.parseInt(item.quantity) } })
        await redis.json.numIncrBy('products:' + item.product, '$.inventoryAmount', -Number.parseInt(item.quantity))
      })
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