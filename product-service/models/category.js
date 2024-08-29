const mongoose = require('mongoose')

const Category = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  avatar: String,
  images: [String],
  isDeleted: Boolean
})


module.exports = mongoose.model('Categories', Category)