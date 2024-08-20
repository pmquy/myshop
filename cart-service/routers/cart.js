const controller = require('../controllers/cart')
const {auth} = require('../middlewares')

const express = require('express')
const router = express.Router()

router.get('/', auth, controller.find)
router.post('/', auth, controller.create)
router.put('/:id', auth, controller.updateById)
router.get('/:id', auth, controller.findById)
router.delete('/:id', auth, controller.deleteById)

module.exports = router