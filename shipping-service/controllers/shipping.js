const { Shipping } = require("../models")
const { E } = require('../utils')
const Joi = require('joi')
const { producer } = require('../configs/kafka')

const VALIDATORS = {
  create: Joi.object({
    order: Joi.string().required(),
    user: Joi.string().required(),
    provider: Joi.string().required(),
    shippingCode: Joi.string().required()
  }).unknown(false).required(),

  update: Joi.object({
    provider: Joi.string(),
    shippingCode: Joi.string()
  }).unknown(false).required()
}

class Controller {
  create = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      const payload = await VALIDATORS.create.validateAsync(req.body)
      payload.status = "Created"
      await Shipping.create(payload)
      res.status(200).json({ status: 200, data: "Created" })
      producer.send({ topic: 'ship_order', messages: [{ value: payload.order }] })
    } catch (error) {
      next(error)
    }
  }

  updateByOrder = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Shipping.findOneAndUpdate({ order: req.params.order }, payload)
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  deleteByOrder = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      await Shipping.findOneAndDelete({ order: req.params.order })
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }

  findByOrder = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const query = { order: req.params.order }
      if (req.user?.role != 'Admin') query.user = req.user._id
      const shipping = await Shipping.findOne(query)
      if (!shipping) throw new E("Shipment not found")
      res.status(200).json({ status: 200, data: shipping })
    } catch (error) {
      next(error)
    }
  }

  find = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const query = JSON.parse(req.query.q)
      if (req.user?.role != 'Admin') query.user = req.user._id
      const shipping = await Shipping.find(query)
      res.status(200).json({ status: 200, data: shipping })
    } catch (error) {
      next(error)
    }
  }

  trackByOrder = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const query = { order: req.params.order }
      if (req.user?.role != 'Admin') query.user = req.user._id
      const shipping = await Shipping.findOne(query)
      if (!shipping) throw new E("Shipment not found")
      res.status(200).json({ status: 200, data: "Tracking number" + shipping.shippingCode })
    } catch (error) {
      next(error)
    }
  }

  confirmByOrder = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const query = { order: req.params.order, status: "Created" }
      if (req.user?.role != 'Admin') query.user = req.user._id
      const shipping = await Shipping.findOne(query)
      if (!shipping) throw new E("Shipment not found")
      await shipping.updateOne({ status: "Done" })
      res.status(200).json({ status: 200, data: "Done" })
      producer.send({ topic: 'ship_done', messages: [{ value: shipping.order }] })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()