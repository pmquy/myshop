const { Kafka } = require('kafkajs')

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
const consumer = kafka.consumer({ groupId: 'user-group' })

const connect = async () => {
  await producer.connect().catch(err => console.log(err.message))
  await consumer.connect().catch(err => console.log(err.message))
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        
      }
    }
  })
  console.log('Connect Kafka', process.env.KAFKA_URI)
}


module.exports = { kafka, producer, consumer, connect }