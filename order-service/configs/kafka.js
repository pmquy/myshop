const { Kafka } = require('kafkajs')
const { Order } = require('../models')

const kafka = new Kafka({
  clientId: 'myshop',
  brokers: [process.env.KAFKA_URI],
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  },
  ssl: process.env.ENV === "PRODUCT",
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'order-group' })

const connect = async () => {
  await producer.connect().catch(err => console.log(err.message))
  await consumer.connect().catch(err => console.log(err.message))
  await consumer.subscribe({ topic: 'pay_order' })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case 'pay_order': {
          const id = message.value.toString()
          await Order.findByIdAndUpdate(id, { status: 'Paid' })
        }
      }
    }
  })
  console.log('Connect Kafka', process.env.KAFKA_URI)
}



module.exports = { kafka, producer, consumer, connect }