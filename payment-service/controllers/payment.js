const { Payment } = require('../models')
const { producer } = require('../configs/kafka')

class Controller {
  find = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const payment = await Payment.find({ ...JSON.parse(req.query.q), user: req.user._id })
      res.status(200).json({ status: 200, data: payment })
    } catch (error) {
      next(error)
    }
  }

  payById = async (req, res, next) => {
    try {
      if (!req.user) throw new E('You must login', 401)
      const payment = await Payment.findById(req.params.id)
      if (payment.user != req.user._id) throw new E('Unauthorized', 403)
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
}

module.exports = new Controller()