const { Order } = require('../models')
const Joi = require('joi')
const { E, DateUtils } = require('../utils')
const { producer } = require('../configs/kafka')
const { redis } = require('../configs/redis')

const url = process.env.PRODUCT_SERVICE ? process.env.PRODUCT_SERVICE : process.env.SERVER_URL

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
    code: Joi.string().default("")
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
      const query = JSON.parse(req.query.q)
      if (req.user.role != 'Admin') query.user = req.user._id
      const orders = await Order.find(query).sort({ createdAt: -1 }).select(['_id', 'status', 'createdAt', 'updatedAt'])
      res.status(200).json({ status: 200, data: orders })
    } catch (error) {
      next(error)
    }
  }

  cancelById = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const order = await Order.findById(req.params.id)
      if (req.user.role != 'Admin' && order.user != req.user._id) throw new E('Unauthorized', 403)
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
      if (req.user.role != 'Admin' && order.user != req.user._id) throw new E('Unauthorized', 403)
      res.status(200).json({ status: 200, data: order })
    } catch (error) {
      next(error)
    }
  }

  summary1 = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      const labels = DateUtils.getDateArr(req.query.startAt, req.query.endAt)
      const orders = await Order.find({ createdAt: { $gte: new Date(req.query.startAt), $lte: new Date(req.query.endAt) } })
      const datasets = [
        {
          label: 'Total order',
          data: labels.map(e => orders.filter(t => new Date(t.createdAt).toLocaleDateString() === e).length)
        },
        {
          label: "Status 'Created'",
          data: labels.map(e => orders.filter(t => t.status === 'Created' && new Date(t.createdAt).toLocaleDateString() === e).length)
        },
        {
          label: "Status 'Paid'",
          data: labels.map(e => orders.filter(t => t.status === 'Paid' && new Date(t.createdAt).toLocaleDateString() === e).length)
        },
        {
          label: "Status 'Shipping'",
          data: labels.map(e => orders.filter(t => t.status === 'Shipping' && new Date(t.createdAt).toLocaleDateString() === e).length)
        },
        {
          label: "Status 'Done'",
          data: labels.map(e => orders.filter(t => t.status === 'Done' && new Date(t.createdAt).toLocaleDateString() === e).length)
        },
        {
          label: "Status 'Canceled'",
          data: labels.map(e => orders.filter(t => t.status === 'Canceled' && new Date(t.createdAt).toLocaleDateString() === e).length)
        },
      ]
      res.status(200).json({ status: 200, data: { labels, datasets } })
    } catch (err) {
      next(err)
    }
  }

  summary2 = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      let product = await redis.json.get('products:' + req.params.id)
      if (!product) product = await fetch(`${url}/products/${req.query.product}`).then(res => res.json()).then(res => res.data)
      const labels = DateUtils.getDateArr(req.query.startAt, req.query.endAt)

      const pipeline = []

      pipeline.push({ $match: { createdAt: { $gte: new Date(req.query.startAt), $lte: new Date(req.query.endAt) } } })
      pipeline.push({ $unwind: { path: "$items" } })
      pipeline.push({ $match: { "items.product": req.query.product } })

      const orders = await Order.aggregate(pipeline)

      const datasets = [
        {
          label: 'Total quantity',
          data: labels.map(e => orders.filter(t => new Date(t.createdAt).toLocaleDateString() === e).reduce((prev, cur) => prev + cur.items.quantity, 0))
        }
      ]

      res.status(200).json({ status: 200, data: { labels, datasets } })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()