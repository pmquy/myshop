const handleError = require('./error')
const handle404 = require('./404')
const auth = require('./auth')

module.exports = {handle404, handleError, auth}