const { Kafka } = require('kafkajs')
const { Payment } = require('../models')
const { redis } = require('./redis')
const url = process.env.PRODUCT_SERVICE ? process.env.PRODUCT_SERVICE : process.env.SERVER_URL

const kafka = new Kafka({
  clientId: 'myshop',
  brokers: [process.env.KAFKA_URI],
  sasl: process.env.ENV === "DEV" ? undefined : {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  },
  ssl: process.env.ENV === "PRODUCT",
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'payment-group' })


const connect = async () => {
  await producer.connect().catch(err => console.log(err.message))
  await consumer.connect().catch(err => console.log(err.message))
  console.log('Connect Kafka', process.env.KAFKA_URI)
}

consumer.subscribe({ topic: 'create_order' })
consumer.subscribe({ topic: 'cancel_order' })

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    switch (topic) {
      case 'create_order':
        const payload = JSON.parse(message.value.toString())
        const priceArr = await Promise.all(payload.items.map(async item =>
          redis.json.get('products:' + item.product)
            .then(product => {
              if (!product) return fetch(`${url}/products/${item.product}`).then(res => res.json()).then(res => res.data)
              return product
            })
            .then(product => Object.entries(item.option).reduce((prev, [key, val]) => prev + product.options[key][val].price, product.price) * item.quantity)
        ))
        let basePrice = priceArr.reduce((prev, cur) => prev + cur, 0)
        let shippingPrice = 50
        let discountPrice = (payload.code === 'HelloWorld') ? 20 : 0
        let finalPrice = basePrice + shippingPrice - discountPrice
        await Payment.create({ order: payload._id, status: 'Created', user: payload.user, basePrice, shippingPrice, discountPrice, finalPrice })
      case 'cancel_order':
        const id = message.value.toString()
        await Payment.findOneAndDelete({ order: id })
    }
  }
})

module.exports = { kafka, producer, consumer, connect }