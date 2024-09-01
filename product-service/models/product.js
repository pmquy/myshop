const mongoose = require('mongoose')

const Product = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  avatar: String,
  images: [String],
  category: String,
  designer: String,
  room: String,
  price: Number,
  inventoryAmount: Number,
  options: Object,
  recommendations: [new mongoose.Schema({
    name: String,
    avatar: String,
    option: Object
  }, { _id: false, minimize: false})],
  isDeleted: Boolean
}, { minimize: false })

Product.index({ name: 'text' })

module.exports = mongoose.model('Products', Product)