const E = require('../utils/error')

module.exports = (req, res, next) => {
  next(new E('Page not found', 404))
}