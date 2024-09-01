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
  ssl: true,
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'order-group' })

const connect = async () => {
  try {
    await producer.connect().catch(err => console.log(err.message))
    await consumer.connect().catch(err => console.log(err.message))
    await consumer.subscribe({ topic: 'pay_order', fromBeginning: true })
    await consumer.subscribe({ topic: 'ship_order', fromBeginning: true })
    await consumer.subscribe({ topic: 'revoke_pay_order', fromBeginning: true })
    await consumer.subscribe({ topic: 'ship_done', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        switch (topic) {
          case 'pay_order': {
            const id = message.value.toString()
            await Order.findOneAndUpdate({ _id: id, status: "Created" }, { status: 'Paid' })
            break
          }
          case 'revoke_pay_order': {
            const id = message.value.toString()
            await Order.findOneAndUpdate({ _id: id, status: "Paid" }, { status: 'Created' })
            break
          }
          case 'ship_order': {
            const id = message.value.toString()
            await Order.findOneAndUpdate({ _id: id, status: "Paid" }, { status: 'Shipping' })
            break
          }
          case 'ship_done': {
            const id = message.value.toString()
            const order = await Order.findById(id)
            producer.send({ topic: 'complete_order', messages: [{ value: JSON.stringify(order) }] })
            await order.updateOne({ status: "Done" })
            break
          }
        }
      }
    })
    console.log('Connect Kafka', process.env.KAFKA_URI)
  } catch (error) {
    console.log(error)
  }

}



module.exports = { kafka, producer, consumer, connect }