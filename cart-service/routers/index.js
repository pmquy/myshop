const {Router} = require('express')
const router = Router()

router.use('/carts', require('./cart'))

module.exports = router
