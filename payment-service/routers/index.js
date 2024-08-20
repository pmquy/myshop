const {Router} = require('express')
const router = Router()

router.use('/payments', require('./payment'))
module.exports = router
