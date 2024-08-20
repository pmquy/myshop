const { Router } = require('express')
const controller = require('../controllers/payment')
const { auth } = require('../middlewares')

const router = Router()

router.put('/:id', auth, controller.payById)
router.get('/', auth, controller.find)

module.exports = router