const bcrypt = require('bcrypt')
const Joi = require('joi')
const User = require('../models/user')
const E = require('../utils/error')
const jwt = require('jsonwebtoken')
const RabbitMQ = require('../configs/rabbitmq')


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
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "15m" })
  }

  #genActivatedToken = data => {
    return jwt.sign(data, process.env.ACTIVATED_TOKEN_SECRET, { expiresIn: "15m" })
  }

  #genRefeshToken = data => {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" })
  }

  login = async (req, res, next) => {
    try {
      const payload = await VALIDATORS.login.validateAsync(req.body)
      const user = await User.findOne({ phoneNumber: payload.phoneNumber, isActivated: true })
      if (!user) throw new E("User not found", 400)
      const r = bcrypt.compareSync(payload.password, user.password)
      if (!r) throw new E("Wrong password", 400)
      const token = this.#genToken({ _id: user._id })
      const refreshToken = this.#genRefeshToken({ _id: user._id })
      res.cookie('refresh_token', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true })
      res.setHeader('Authorization', `Bearer ${token}`)
      res.setHeader('Access-Control-Expose-Headers', 'Authorization')
      res.status(200).json({ status: 200, data: user })
    } catch (err) {
      next(new E(err.message))
    }
  }

  refresh = async (req, res, next) => {
    try {
      const data = jwt.verify(req.cookies.refresh_token, process.env.REFRESH_TOKEN_SECRET)
      const token = this.#genToken({ _id: data._id })
      res.setHeader('Authorization', `Bearer ${token}`)
      res.setHeader('Access-Control-Expose-Headers', 'Authorization')
      res.status(200).json({ status: 200, data: "Refreshed" })
    } catch (error) {
      next(error)
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
      RabbitMQ.produce('create_user', { user, token })
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
      res.redirect(`${process.env.FRONTEND_URL}/user/login`)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new Controller()
