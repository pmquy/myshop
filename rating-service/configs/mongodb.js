const mongoose = require('mongoose')

const connect = () => {

  mongoose.connect(process.env.MONGO_URI, { dbName: 'myshop'})
    .then(() => console.log('Connected MongoDB: ' + process.env.MONGO_URI))
    .catch(err => console.error(err.message))
}

module.exports = { connect }