const router = require('express').Router()

router.use('/ratings', require('./rating'))

module.exports = router
