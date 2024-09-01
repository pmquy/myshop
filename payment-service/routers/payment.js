const controller = require('../controllers/payment')
const router = require('express').Router()

router.post('/:order/confirmPay', controller.confimrPayByOrder)
router.post('/:order/revokePay', controller.revokePayByOrder)
router.get('/:order', controller.findByOrder)
router.get('/', controller.find)
router.post('/summary1', controller.summary1)

module.exports = router