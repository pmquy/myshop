const { Kafka } = require('kafkajs')
const { Product } = require('../models')
const { redis } = require('./redis')

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
const consumer = kafka.consumer({ groupId: 'product-group' })

const connect = async () => {
  await producer.connect().catch(err => console.log(err.message))
  await consumer.connect().catch(err => console.log(err.message))
  console.log('Connect Kafka', process.env.KAFKA_URI)
}

consumer.subscribe({ topic: 'create_order' })

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const payload = JSON.parse(message.value.toString())
    switch (topic) {
      case 'create_order':
        payload.items.forEach(async item => {
          await Product.findByIdAndUpdate(item.product, { $inc: { inventoryAmount: -Number.parseInt(item.quantity) } })
          await redis.json.numIncrBy('products:' + item.product, '$.inventoryAmount', -Number.parseInt(item.quantity))
        })
        break
    }
  }
})

module.exports = { kafka, producer, consumer, connect }