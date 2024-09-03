const { Kafka } = require('kafkajs')
const { transporter } = require('../configs/email')
const { Notification } = require('../models')

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
const consumer = kafka.consumer({ groupId: 'notification-group' })

const connect = async () => {
  await producer.connect().catch(err => console.log(err.message))
  await consumer.connect().catch(err => console.log(err.message))
  await consumer.subscribe({ topic: 'create_user' })
  await consumer.subscribe({ topic: 'pay_order' })
  await consumer.subscribe({ topic: 'ship_order' })
  await consumer.subscribe({ topic: 'revoke_pay_order' })
  await consumer.subscribe({ topic: 'ship_done' })
  await consumer.subscribe({ topic: 'create_order' })
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
        case 'pay_order': {
          const { order, user } = JSON.parse(message.value.toString())
          await Notification.create({ user, message: `Your order ${order} was paid`, link: `/user/order/${order}` })
          break
        }
        case 'revoke_pay_order': {
          const { order, user } = JSON.parse(message.value.toString())
          break
        }
        case 'ship_order': {
          const { order, user } = JSON.parse(message.value.toString())
          await Notification.create({ user, message: `Your order ${order} was shipped`, link: `/user/order/${order}` })
          break
        }
        case 'ship_done': {
          const { order, user } = JSON.parse(message.value.toString())
          await Notification.create({ user, message: `Your order ${order} was completed`, link: `/user/order/${order}` })
          break
        }
        case 'create_order':
          const { _id, user } = JSON.parse(message.value.toString())
          await Notification.create({ user, message: `Your order ${_id} was created`, link: `/user/order/${_id}` })
          break
      }
    }
  })
  console.log('Connect Kafka', process.env.KAFKA_URI)
}


module.exports = { kafka, producer, consumer, connect }