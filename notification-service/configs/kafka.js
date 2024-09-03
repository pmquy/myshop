const { Kafka } = require('kafkajs')
const { Notification } = require('../models')
const {transporter} =  require('../configs/email')

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
  await consumer.subscribe({ topic: 'create_user', fromBeginning: true})
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case 'create_user': {
          const { user, token } = JSON.parse(message.value.toString())
          await transporter.sendMail({
            to: user.email,
            subject: 'Activate your account',
            text: `Please click on the following link to activate your account: ${process.env.USER_SERVICE}/users/activate?token=${token}`,
            html: `
                <p>Please click on the following link to activate your account (The link will expire in 15 minutes):</p>
                <a href="${process.env.USER_SERVICE}/users/activate?token=${token}">Activate Account</a>
              `
          })
          break
        }
      }
    }
  })
  console.log('Connect Kafka', process.env.KAFKA_URI)
}


module.exports = { kafka, producer, consumer, connect }