const { Kafka } = require('kafkajs')
const { Payment } = require('../models')
const { redis } = require('./redis')
const Voucher = require('../models/voucher')
const { PaymentUtils } = require('../utils')
const url = process.env.PRODUCT_SERVICE ? process.env.PRODUCT_SERVICE : process.env.SERVER_URL

const kafka = new Kafka({
  clientId: 'myshop',
  brokers: [process.env.KAFKA_URI],
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  },
  ssl: true,
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'payment-group' })

const connect = async () => {
  await producer.connect().catch(err => console.log(err.message))
  await consumer.connect().catch(err => console.log(err.message))
  await consumer.subscribe({ topic: 'create_order' })
  await consumer.subscribe({ topic: 'cancel_order' })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case 'create_order':
          const order = JSON.parse(message.value.toString())
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
          break

        case 'cancel_order':
          const id = message.value.toString()
          await Payment.findOneAndDelete({ order: id })
          break
      }
    }
  })
  console.log('Connect Kafka', process.env.KAFKA_URI)
}




module.exports = { kafka, producer, consumer, connect }