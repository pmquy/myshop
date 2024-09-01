const router = require('express').Router()
const controller = require('../controllers/shipping')

router.post('/:order/tracking', controller.trackByOrder)
router.post('/:order/confirm', controller.confirmByOrder)
router.get('/:order', controller.findByOrder)
router.put('/:order', controller.updateByOrder)
router.delete('/:order', controller.deleteByOrder)
router.post('/', controller.create)
router.get('/', controller.find)

module.exports = router