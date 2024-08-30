const Voucher = require('../models/voucher')
const Joi = require('joi')
const { E } = require('../utils')

const VALIDATORS = {
  create: Joi.object({
    user: Joi.string().default(''),
    quantity: Joi.number().integer().min(1).default(1),
    code: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
  }).required().unknown(false),

  update: Joi.object({
    user: Joi.string(),
    quantity: Joi.number().integer().min(1),
    code: Joi.string(),
    type: Joi.string(),
    description: Joi.string(),
    amount: Joi.number(),
  }).required().unknown(false),

}

class Controller {

  create = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      const payload = await VALIDATORS.create.validateAsync(req.body)
      await Voucher.create(payload)
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  updateByCode = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Voucher.findOneAndUpdate({ code: req.params.code }, payload)
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  deleteByCode = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      await Voucher.findOneAndDelete({ code: req.params.code })
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }

  find = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const query = JSON.parse(req.query.q)
      if (req.user.role != 'Admin') query.$or = [{ user: req.user._id }, { user: "" }]
      const vouchers = await Voucher.find(query)
      res.status(200).json({ status: 200, data: vouchers })
    } catch (error) {
      next(error)
    }
  }

  findByCode = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const query = { code: req.params.code }
      if (req.user.role != 'Admin') query.$or = [{ user: req.user._id }, { user: "" }]
      const voucher = await Voucher.findOne(query)
      if (!voucher) throw new E("Invalid code", 400)
      res.status(200).json({ status: 200, data: voucher })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()