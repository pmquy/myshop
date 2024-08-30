const controller = require('../controllers/payment')
const router = require('express').Router()

router.put('/:id', controller.payById)
router.get('/', controller.find)
router.post('/summary1', controller.summary1)

module.exports = router