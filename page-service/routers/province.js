const controller = require('../controllers/province')

const { Router } = require('express')
const router = Router()

router.get('/', controller.find)


module.exports = router
