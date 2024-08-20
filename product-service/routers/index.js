const {Router} = require('express')
const router = Router()

router.use('/rooms', require('./room'))
router.use('/categories', require('./category'))
router.use('/designers', require('./designer'))
router.use('/products', require('./product'))

module.exports = router
