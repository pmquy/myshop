const mongoose = require('mongoose')

const Payment = new mongoose.Schema({
  order: String,
  basePrice: Number,
  shippingPrice: Number,
  discountPrice: Number,
  finalPrice: Number,
  status: String,
  user: String,
}, { timestamps: true })

Payment.index({ order: 1 }, { unique: true })

module.exports = mongoose.model('Payments', Payment)