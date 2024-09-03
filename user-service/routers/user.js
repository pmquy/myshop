const controller = require('../controllers/user')

const { auth } = require('../middlewares')
const router = require('express').Router()

router.get('/me', auth, controller.getMe)
router.put('/me', auth, controller.updateMe)
router.post('/me/changepassword', auth, controller.changePassword)
router.post('/me/refresh', controller.refresh)
router.delete('/me', auth, controller.deleteMe)
router.get('/activate', controller.activate)
router.post('/login', controller.login)
router.post('/', controller.create)
router.get('/', auth, controller.find)

module.exports = router
