const { Rating } = require("../models")
const { E } = require('../utils')
const Joi = require('joi')

const VALIDATORS = {
  create: Joi.object({
    comment: Joi.string().required(),
    star: Joi.number().integer().min(1).max(5).required(),
    product: Joi.string().required()
  }).unknown(false).required(),

  update: Joi.object({
    comment: Joi.string(),
    star: Joi.number().integer().min(1).max(5),
  })
}

class Controller {

  create = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const payload = await VALIDATORS.create.validateAsync(req.body)
      const rating = await Rating.findOne({ user: req.user._id, product: payload.product, status: "Pending" })
      if (!rating) throw new E("You must buy the product to rate", 400)
      await rating.updateOne({ comment: payload.comment, star: payload.star, displayName: `${req.user.salutation} ${req.user.firstName} ${req.user.lastName}`, status: "Done" })
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  updateById = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      const rating = await Rating.findById(req.params.id)
      if (rating.user != req.user._id) throw new E("Invalid account", 403)
      await rating.updateOne(payload)
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  find = async (req, res, next) => {
    try {
      const query = JSON.parse(req.query.q)
      const page = Number.parseInt(req.query.page)
      const limit = Number.parseInt(req.query.limit)
      const ratings = await Rating.find(query).sort({ updatedAt: -1 }).skip(page * limit).limit(limit).select(['displayName', 'comment', 'star', 'updatedAt'])
      const length = await Rating.countDocuments(query)
      res.status(200).json({ status: 200, data: { ratings, hasMore: length > (page + 1) * limit } })
    } catch (error) {
      next(error)
    }
  }

  getAvg = async (req, res, next) => {
    try {
      const query = JSON.parse(req.query.q); query.status = "Done"
      const avg = await Rating.aggregate([{ $match: query }, { $group: { _id: null, avg: { $avg: '$star' } } }])
      res.status(200).json({ status: 200, data: avg[0].avg ? `(${avg[0].avg.toFixed(2)}/5)` : "" })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new Controller()