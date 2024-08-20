const controller = require('../controllers/user')

const { auth } = require('../middlewares')
const { Router } = require('express')
const router = Router()

router.post('/login', controller.login)
router.get('/me', auth, controller.getMe)
router.put('/me', auth, controller.updateMe)
router.post('/me/changepassword', auth, controller.changePassword)
router.delete('/me', auth, controller.deleteMe)
router.post('/', controller.create)
router.get('/', auth, controller.find)

module.exports = router
