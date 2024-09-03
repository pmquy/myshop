const controller = require('../controllers/rating')
const router = require('express').Router()
const {auth} = require('../middlewares')

router.put('/:id', auth, controller.updateById)
router.get('/avg', controller.getAvg)
router.post('/', auth, controller.create)
router.get('/', controller.find)

module.exports = router

