const { Kafka } = require('kafkajs')
const { Rating } = require('../models')

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
const consumer = kafka.consumer({ groupId: 'rating-group' })

const connect = async () => {
  await producer.connect().catch(err => console.log(err.message))
  await consumer.connect().catch(err => console.log(err.message))
  await consumer.subscribe({ topic: 'done_order', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case 'done_order': {
          const id = message.value.toString()
          await Order.findOneAndUpdate({ _id: id, status: "Shipping" }, { status: 'Done' })
          break
        }
      }
    }
  })
  console.log('Connect Kafka', process.env.KAFKA_URI)
}


module.exports = { kafka, producer, consumer, connect }