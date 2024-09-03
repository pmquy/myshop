const router = require('express').Router()
const controller = require('../controllers/notification')

router.get('/', controller.find)

module.exports = router