const { Product, Designer, Room, Category } = require('../models')
const { E } = require('../utils')
const Joi = require('joi')
const { redis } = require('../configs/redis')

const VALIDATORS = {

  create:
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      avatar: Joi.string().required(),
      images: Joi.array().min(1).items(Joi.string()).required(),
      category: Joi.string().required(),
      designer: Joi.string().required(),
      room: Joi.string().required(),
      inventoryAmount: Joi.number().integer().min(0).default(100),
      price: Joi.number().min(0).required(),
      options: Joi.object().pattern(Joi.string(), Joi.array().min(2).items(Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        price: Joi.number().min(0).required()
      }).unknown(false))).required(),
      recommendations: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        option: Joi.object().pattern(Joi.string(), Joi.number().integer().min(0))
      }).unknown(false)).required()
    }).unknown(false).required().custom((value, helpers) => {
      const keys = Object.keys(value.options)
      if (value.recommendations.some(e => Object.keys(e.option).some(t => !keys.includes(t) || e.option[t] < 0 || e.option[t] >= value.options[t].length))) return helpers.message("Invalid recommendation option")
      return value
    })
  ,

  update:
    Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      avatar: Joi.string(),
      images: Joi.array().min(1).items(Joi.string()),
      price: Joi.number().min(0),
      category: Joi.string(),
      designer: Joi.string(),
      room: Joi.string(),
      inventoryAmount: Joi.number().integer().min(0),
      options: Joi.object().pattern(Joi.string(), Joi.array().min(2).items(Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        price: Joi.number().min(0).required()
      }).unknown(false))),
      recommendations: Joi.array().items(Joi.object({
        avatar: Joi.string().required(),
        name: Joi.string().required(),
        option: Joi.object().pattern(Joi.string(), Joi.number().integer().min(0))
      }).unknown(false))
    }).unknown(false).required()
}

class Controller {
  find = async (req, res, next) => {
    try {
      const query = JSON.parse(req.query.q)
      const page = Number.parseInt(req.query.page)
      const limit = Number.parseInt(req.query.limit)
      const products = await Product.find(query).skip(page * limit).limit(limit).select(["_id", "name", "avatar", "designer",])
      const length = await Product.countDocuments(query)
      redis.json.set(req.originalUrl, '$', products)
      res.status(200).json({ status: 200, data: { products, hasMore: length > (page + 1) * limit } })
    } catch (error) {
      next(error)
    }
  }

  findById = async (req, res, next) => {
    try {
      const cache = await redis.json.get('products:' + req.params.id)
      if (cache) return res.status(200).json({ status: 200, data: cache })
      const product = await Product.findById(req.params.id)
      if (!product) throw new E(`Product ${req.params.id} not found`, 400)
      redis.json.set('products:' + req.params.id, '$', product)
      res.status(200).json({ status: 200, data: product })
    } catch (error) {
      next(error)
    }
  }

  deleteById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      await Product.findByIdAndUpdate(req.params.id, { isDeleted: true })
      redis.json.set('products:' + req.params.id, '$.isDeleted', true)
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }

  updateById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Product.findByIdAndUpdate(req.params.id, payload)
      redis.json.mSet(Object.entries(payload).map(([a, b]) => { return { key: 'products:' + req.params.id, path: '$.' + a, value: b } }))
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = { ...await VALIDATORS.create.validateAsync(req.body), isDeleted: false }
      await Product.create(payload)
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  summary1 = async (req, res, next) => {
    try {
      const designers = await Designer.find({})
      const categories = await Category.find({})
      const rooms = await Room.find({})
      const products = await Product.find({})
      const data = [{ labels: [], datasets: [{ data: [] }] }, { labels: [], datasets: [{ data: [] }] }, { labels: [], datasets: [{ data: [] }] }]
      designers.forEach(e => {
        data[0].labels.push(e.name)
        data[0].datasets[0].data.push(products.filter(t => t.designer == e._id).length)
      })
      categories.forEach(e => {
        data[1].labels.push(e.name)
        data[1].datasets[0].data.push(products.filter(t => t.category == e._id).length)
      })
      rooms.forEach(e => {
        data[2].labels.push(e.name)
        data[2].datasets[0].data.push(products.filter(t => t.room == e._id).length)
      })
      res.status(200).json({ status: 200, data: data })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()
