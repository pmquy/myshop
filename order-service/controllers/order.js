const { Order } = require('../models')
const Joi = require('joi')
const { E } = require('../utils')
const { producer } = require('../configs/kafka')

const VALIDATORS = {
  create: Joi.object({
    items: Joi.array().min(1).items(Joi.object({
      product: Joi.string().required(),
      option: Joi.object().pattern(Joi.string(), Joi.number().integer().min(0)).required(),
      quantity: Joi.number().integer().min(1).default(1)
    })),
    address: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      salutation: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      province: Joi.string().required(),
      district: Joi.string().required(),
      ward: Joi.string().required(),
      detail: Joi.string().required()
    }).unknown(false).required(),
    note: Joi.string().required(),
    code: Joi.string()
  }).required().unknown(false),
}

class Controller {
  create = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const payload = await VALIDATORS.create.validateAsync(req.body)
      const order = await Order.create({ ...payload, user: req.user._id, status: 'Created' })
      res.status(200).json({ status: 200, data: 'Created' })
      producer.send({
        topic: 'create_order',
        messages: [{ value: JSON.stringify(order) }]
      })
    } catch (error) {
      next(error)
    }
  }

  find = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const orders = await Order.find({ ...JSON.parse(req.query.q), user: req.user._id }).select(['_id', 'status', 'createdAt']).sort({ createdAt: -1 })
      res.status(200).json({ status: 200, data: orders })
    } catch (error) {
      next(error)
    }
  }

  cancelById = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const order = await Order.findById(req.params.id)
      if (order.user != req.user._id) throw new E('Unauthorized', 403)
      if (order.status != 'Created') throw new E('The order cannot be canceled', 400)
      await order.updateOne({ status: 'Canceled' })
      res.status(200).json({ status: 200, data: 'Canceled' })
      producer.send({
        topic: 'cancel_order',
        messages: [{ value: req.params.id }]
      })
    } catch (error) {
      next(error)
    }
  }

  findById = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const order = await Order.findById(req.params.id)
      if (order.user != req.user._id) throw new E('Unauthorized', 403)
      res.status(200).json({ status: 200, data: order })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()