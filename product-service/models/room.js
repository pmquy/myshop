const mongoose = require('mongoose')

const Room = new mongoose.Schema({
  name: String,
  description: String,
  avatar: String,
  images: [String],
})


module.exports = mongoose.model('Rooms', Room)