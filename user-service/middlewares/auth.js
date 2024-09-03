const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
  try {
    const data = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET)
    const user = await User.findOne({ _id: data._id, isActivated: true })
    req.user = user
  } catch (error) {

  } finally {
    next()
  }
}