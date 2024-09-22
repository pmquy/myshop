const amqplib = require('amqplib')
const { transporter } = require('../configs/email')
const { Notification } = require('../models')

const groupId = 'notification-group'

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

    const exchange1 = await channel.assertExchange('create_user', 'fanout', { durable: false })
    const queue1 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue1.queue, exchange1.exchange, groupId)

    const exchange2 = await channel.assertExchange('pay_order', 'fanout', { durable: false })
    const queue2 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue2.queue, exchange2.exchange, groupId)

    const exchange3 = await channel.assertExchange('ship_order', 'fanout', { durable: false })
    const queue3 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue3.queue, exchange3.exchange, groupId)

    const exchange4 = await channel.assertExchange('revoke_pay_order', 'fanout', { durable: false })
    const queue4 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue4.queue, exchange4.exchange, groupId)

    const exchange5 = await channel.assertExchange('ship_done', 'fanout', { durable: false })
    const queue5 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue5.queue, exchange5.exchange, groupId)

    const exchange6 = await channel.assertExchange('create_order', 'fanout', { durable: false })
    const queue6 = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue6.queue, exchange6.exchange, groupId)

    channel.consume(queue1.queue, async message => {
      const { user, token } = JSON.parse(message.content.toString())
      await transporter.sendMail({
        to: user.email,
        subject: 'Activate your account',
        text: `Please click on the following link to activate your account: ${process.env.USER_SERVICE}/users/activate?token=${token}`,
        html: `
                <p>Please click on the following link to activate your account (The link will expire in 15 minutes):</p>
                <a href="${process.env.USER_SERVICE}/users/activate?token=${token}">Activate Account</a>
              `
      })
      channel.ack(message)
    })

    channel.consume(queue2.queue, async message => {
      const { order, user } = JSON.parse(message.content.toString())
      await Notification.create({ user, message: `Your order ${order} was paid`, link: `/user/order/${order}` })
      channel.ack(message)
    })

    channel.consume(queue3.queue, async message => {
      const { order, user } = JSON.parse(message.content.toString())
      await Notification.create({ user, message: `Your order ${order} was shipped`, link: `/user/order/${order}` })
      channel.ack(message)
    })

    channel.consume(queue4.queue, async message => {
      const { order, user } = JSON.parse(message.content.toString())
      channel.ack(message)
    })

    channel.consume(queue5.queue, async message => {
      const { order, user } = JSON.parse(message.content.toString())
      await Notification.create({ user, message: `Your order ${order} was completed`, link: `/user/order/${order}` })
      channel.ack(message)
    })

    channel.consume(queue6.queue, async message => {
      const { _id, user } = JSON.parse(message.content.toString())
      await Notification.create({ user, message: `Your order ${_id} was created`, link: `/user/order/${_id}` })
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