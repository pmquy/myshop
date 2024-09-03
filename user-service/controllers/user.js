const bcrypt = require('bcrypt')
const Joi = require('joi')
const User = require('../models/user')
const E = require('../utils/error')
const jwt = require('jsonwebtoken')
const { producer } = require('../configs/kafka')


const VALIDATORS = {
  create: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    salutation: Joi.string().required(),
    password: Joi.string().required().custom((value, _) => bcrypt.hashSync(value, 10)),
    addresses: Joi.array().min(0).items(Joi.object({
      province: Joi.string().required(),
      district: Joi.string().required(),
      ward: Joi.string().required(),
      detail: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      salutation: Joi.string().required(),
    }).unknown(false)),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }).unknown(false).required()

  ,

  login: Joi.object({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required()
  })

  ,

  update: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    salutation: Joi.string(),
    addresses: Joi.array().min(0).items(Joi.object({
      province: Joi.string().required(),
      district: Joi.string().required(),
      ward: Joi.string().required(),
      detail: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      salutation: Joi.string().required(),
    }).unknown(false)),
    email: Joi.string(),
    phoneNumber: Joi.string(),
  }).unknown(false).required(),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    password: Joi.string().required().custom((value, _) => bcrypt.hashSync(value, 10)),
  }).unknown(false).required()

}

class Controller {
  #genToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1d" })
  }

  #genActivatedToken = data => {
    return jwt.sign(data, process.env.ACTIVATED_TOKEN_SECRET, { expiresIn: "15m" })
  }

  login = async (req, res, next) => {
    try {
      const payload = await VALIDATORS.login.validateAsync(req.body)
      const user = await User.findOne({ phoneNumber: payload.phoneNumber, isActivated: true})
      if(!user) throw new E("User not found", 400)
      const r = bcrypt.compareSync(payload.password, user.password)
      if (!r) throw new E("Wrong password", 400)
      const token = this.#genToken({ _id: user._id })
      res.setHeader('Authorization', `Bearer ${token}`)
      res.setHeader('Access-Control-Expose-Headers', 'Authorization')
      res.status(200).json({ status: 200, data: user })
    } catch (err) {
      next(new E(err.message))
    }
  }

  getMe = async (req, res, next) => {
    if (!req.user) return next(new E('You must login', 401))
    return res.status(200).json({ status: 200, data: req.user })
  }

  updateMe = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      const user = await User.findByIdAndUpdate(req.user._id, payload, { new: true })
      return res.status(200).json({ status: 200, data: user })
    } catch (err) {
      next(err)
    }
  }

  changePassword = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const payload = await VALIDATORS.changePassword.validateAsync(req.body)
      const r = bcrypt.compareSync(payload.currentPassword, req.user.password)
      if (!r) throw new E("Wrong password", 400)
      await User.findByIdAndUpdate(req.user._id, { password: payload.password })
      return res.status(200).json({ status: 200, data: 'Changed password' })
    } catch (err) {
      next(err)
    }
  }

  deleteMe = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      await User.findByIdAndDelete(req.user._id)
      return res.status(200).send({ status: 200, data: 'Deleted' })
    } catch (err) {
      next(err)
    }
  }

  create = async (req, res, next) => {
    try {
      const payload = { ...await VALIDATORS.create.validateAsync(req.body), role: 'Customer', isActivated: false }
      const user = await User.create(payload)
      const token = this.#genActivatedToken({ _id: user._id })
      res.status(200).send({ status: 200, data: 'Created' })
      producer.send({ topic: 'create_user', messages: [{ value: JSON.stringify({ user, token }) }] })
    } catch (err) {
      next(new E(err.message))
    }
  }

  find = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const users = await User.find(req.query)
      res.status(200).json({ status: 200, data: users })
    } catch (err) {
      next(err)
    }
  }

  activate = async (req, res, next) => {
    try {
      const token = req.query.token
      const data = jwt.verify(token, process.env.ACTIVATED_TOKEN_SECRET)
      const user = User.findById(data._id)
      if (!user) throw new E("User not found", 400)
      await user.updateOne({ isActivated: true })
      res.status(200).json({ status: 200, data: "Activated" })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new Controller()
