const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
  try {
    const data = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET)
    const user = await User.findById(data._id)
    req.user = user
  } catch (error) {
    
  } finally {
    next()
  }
}