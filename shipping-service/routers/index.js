const router = require('express').Router()
const {auth} = require('../middlewares')

router.use('/shippings', auth, require('./shipping'))

module.exports = router
