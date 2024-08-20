const {Router} = require('express')
const controller = require('../controllers/order')
const {auth} = require('../middlewares')

const router = Router()

router.get('/:id', auth, controller.findById)
router.delete('/:id', auth, controller.cancelById)
router.get('/', auth, controller.find)
router.post('/', auth, controller.create)

module.exports = router