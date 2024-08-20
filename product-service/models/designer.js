const mongoose = require('mongoose')

const Designer = new mongoose.Schema({
  name: String,
  description: String,
  avatar: String,
  images: [String],
})

module.exports = mongoose.model('Designers', Designer)