const {Router} = require('express')

const router = Router()

router.use('/provinces', require('./province'))

module.exports = router
