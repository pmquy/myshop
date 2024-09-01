const mongoose = require('mongoose')

const Cart = new mongoose.Schema({
  user : String,
  product: String,
  quantity: Number,
  option: Object,
}, {minimize: false})

module.exports = mongoose.model("Carts", Cart)