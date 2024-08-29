const mongoose = require('mongoose')

const Room = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  avatar: String,
  images: [String],
  isDeleted: Boolean
})


module.exports = mongoose.model('Rooms', Room)