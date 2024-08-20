const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')
const {auth} = require('../middlewares')

// controller.init()

router.get('/:id', controller.findById)
router.put('/:id', auth, controller.updateById)
router.delete('/:id', auth, controller.updateById)
router.get('/', controller.find)
router.post('/', auth, controller.create)

module.exports = router