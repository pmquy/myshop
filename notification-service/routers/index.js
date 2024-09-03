const router = require('express').Router()

router.use('/notifications', require('./notification'))

module.exports = router
