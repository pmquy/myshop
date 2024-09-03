const router = require('express').Router()
const { auth } = require('../middlewares')

router.use('/notifications', auth, require('./notification'))

module.exports = router
