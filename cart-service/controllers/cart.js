const { Cart } = require('../models')
const { E } = require('../utils')
const Joi = require('joi')

const VALIDATORS = {
  create: Joi.object({
    product: Joi.string().required(),
    option: Joi.object().pattern(Joi.string(), Joi.number().integer().min(0)).required(),
    quantity: Joi.number().integer().min(1).default(1)
  }).unknown(false).required()
  ,
  update: Joi.object({
    quantity: Joi.number().integer().min(1),
    option: Joi.object().pattern(Joi.string(), Joi.number().integer().min(0)),
  }).unknown(false).required()
}

class Controller {

  create = async (req, res, next) => {
    try {
      if (!req.user) throw new E("You must login", 401)
      const payload = await VALIDATORS.create.validateAsync(req.body)
      await Cart.create({ ...payload, user: req.user._id, quantity: 1})
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  find = async (req, res, next) => {
    try {
      if (!req.user) throw new E("You must login", 401)
      const carts = await Cart.find({ ...JSON.parse(req.query.q), user: req.user._id })
      res.status(200).json({ status: 200, data: carts })
    } catch (error) {
      next(error)
    }
  }

  updateById = async(req, res, next) => {
    try {
      if (!req.user) throw new E("You must login", 401)
      const cart = await Cart.findById(req.params.id)
      if(cart.user != req.user._id) throw new E("Cart not found", 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await cart.updateOne(payload)
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }
  
  findById = async(req, res, next) => {
    try {
      if (!req.user) throw new E("You must login", 401)
      const cart = await Cart.findById(req.params.id)
      if(cart.user != req.user._id) throw new E("Cart not found", 403)
      res.status(200).json({ status: 200, data: cart })
    } catch (error) {
      next(error)
    }
  }

  deleteById = async(req, res, next) => {
    try {
      if (!req.user) throw new E("You must login", 401)
      const cart = await Cart.findById(req.params.id)
      if(cart.user != req.user._id) throw new E("Cart not found", 403)
      await cart.deleteOne()
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()