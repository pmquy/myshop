const mongoose = require('mongoose')

const Category = new mongoose.Schema({
  name: String,
  description: String,
  avatar: String,
  images: [String],
})


module.exports = mongoose.model('Categories', Category)