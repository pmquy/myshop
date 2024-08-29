const {Router} = require('express')
const controller = require('../controllers/order')
const {auth} = require('../middlewares')

const router = Router()

router.get('/:id', auth, controller.findById)
router.delete('/:id', auth, controller.cancelById)
router.get('/', auth, controller.find)
router.post('/', auth, controller.create)
router.post('/summary1', auth, controller.summary1)
router.post('/summary2', auth, controller.summary2)

module.exports = router