const { Rating } = require("../models")
const { E } = require('../utils')
const Joi = require('joi')

const VALIDATORS = {
  update: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.string().required()
  }).unknown(false).required()
}

class Controller {
  
  updateByOrder = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Rating.findOneAndUpdate({ order: req.params.order, status: "Pending", user: req.user._id }, payload)
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
}

module.exports = new Controller()