const amqplib = require('amqplib')
const { Payment } = require('../models')
const { redis } = require('./redis')
const Voucher = require('../models/voucher')
const { PaymentUtils } = require('../utils')
const url = process.env.PRODUCT_SERVICE ? process.env.PRODUCT_SERVICE : process.env.SERVER_URL

const groupId = 'payment-group'

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

    const exchange3 = await channel.assertExchange('cancel_order', 'fanout', { durable: false })
    const queue3 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue3.queue, exchange3.exchange, groupId)

    channel.consume(queue2.queue, async message => {
      const order = JSON.parse(message.content.toString())
      const priceArr = await Promise.all(order.items.map(async item =>
        redis.json.get('products:' + item.product)
          .then(product => {
            if (!product) return fetch(`${url}/products/${item.product}`).then(res => res.json()).then(res => res.data)
            return product
          })
          .then(product => Object.entries(item.option).reduce((prev, [key, val]) => prev + product.options[key][val].price, product.price) * item.quantity)
      ))
      const voucher = await Voucher.findOne({ code: order.code, quantity: { $gt: 0 }, $or: [{ user: order.user }, { user: "" }] })
      let basePrice = priceArr.reduce((prev, cur) => prev + cur, 0)
      let shippingPrice = 50
      let discountPrice = voucher ? PaymentUtils.caculateDiscountPrice(basePrice, voucher) : 0
      let finalPrice = basePrice + shippingPrice - discountPrice

      await Payment.create({ order: order._id, status: 'Pending', user: order.user, basePrice, shippingPrice, discountPrice, finalPrice })
      if (voucher) await voucher.updateOne({ quantity: voucher.quantity - 1 })
      channel.ack(message)
    })

    channel.consume(queue3.queue, async message => {
      const id = JSON.parse(message.content.toString())
      await Payment.findOneAndDelete({ order: id })
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