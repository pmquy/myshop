const { auth } = require('../middlewares')
const router = require("express").Router()

router.use('/vouchers', auth, require('./voucher'))
router.use('/payments', auth, require('./payment'))
module.exports = router
