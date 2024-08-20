const Province = require('../models/province')
const E = require('../utils/error')

class Controller {
  find = async (req, res, next) => {
    try {
      const provinces = await Province.find()
      res.status(200).json({status: 200, data: provinces})
    } catch(error) {
      next(error)
    }
  }
}

module.exports = new Controller()