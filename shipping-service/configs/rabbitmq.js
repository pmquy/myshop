const amqplib = require('amqplib')
const { Shipping } = require('../models')


const groupId = 'shipping-group'

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

    this.#channel = channel
    console.log('Connected RabbitMQ', process.env.RABBITMQ_URI)
  }

  produce(topic, message) {
    this.#channel.publish(topic, '', Buffer.from(JSON.stringify(message)))
  }
}


module.exports = new RabbitMQ()