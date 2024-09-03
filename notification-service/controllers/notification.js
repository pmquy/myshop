const { Notification } = require('../models')
const { E } = require('../utils')

class Controller {
  find = async (req, res, next) => {
    try {
      if (!req.user) throw new E("Please log in", 401)
      const query = JSON.parse(req.query.q); query.user = req.user._id
      const page = Number.parseInt(req.query.page)
      const limit = Number.parseInt(req.query.limit)
      const notifications = await Notification.find(query).sort({createdAt: -1}).skip(page * limit).limit(limit)
      const length = await Notification.countDocuments(query)
      res.status(200).json({ status: 200, data: { notifications, hasMore: length > (page + 1) * limit } })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Controller()