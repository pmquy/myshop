const { Payment } = require('../models')
const { producer } = require('../configs/kafka')
const { DateUtils, E } = require('../utils')

class Controller {

  find = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const query = JSON.parse(req.query.q)
      if (req.user.role != 'Admin') query.user = req.user._id
      const payment = await Payment.find(query)
      res.status(200).json({ status: 200, data: payment })
    } catch (error) {
      next(error)
    }
  }

  payById = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const payment = await Payment.findById(req.params.id)
      if (req.user.role != 'Admin') throw new E('Unauthorized', 403)
      if (payment.status != 'Created') throw new E('The payment was done', 400)
      await payment.updateOne({ status: 'Done' })
      res.status(200).json({ status: 200, data: 'paid' })
      producer.send({
        topic: 'pay_order',
        messages: [
          { value: payment.order }
        ]
      })
    } catch (error) {
      next(error)
    }
  }

  summary1 = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E("Invalid account", 403)
      const labels = DateUtils.getDateArr(req.query.startAt, req.query.endAt)
      const payments = await Payment.find({ createdAt: { $gte: req.query.startAt, $lte: req.query.endAt } })
      const datasets = [
        {
          label: 'Total receiving price',
          data: labels.map(e => payments.filter(t => t.status == 'Done' && new Date(t.updatedAt).toLocaleDateString() === e).reduce((prev, cur) => prev + cur.finalPrice, 0))
        },
        {
          label: 'Total waiting price',
          data: labels.map(e => payments.filter(t => t.status == 'Created' && new Date(t.createdAt).toLocaleDateString() === e).reduce((prev, cur) => prev + cur.finalPrice, 0))
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
    } catch (error) {
      next(error)
    }
  }


}

module.exports = new Controller()