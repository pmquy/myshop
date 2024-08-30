const controller = require('../controllers/voucher')
const router = require('express').Router()

router.get('/:code', controller.findByCode)
router.put('/:code', controller.updateByCode)
router.delete('/:code', controller.deleteByCode)
router.get('/', controller.find)
router.post('/', controller.create)

module.exports = router