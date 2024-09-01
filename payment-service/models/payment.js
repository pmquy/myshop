const mongoose = require('mongoose')

const Payment = new mongoose.Schema({
  order: {
    type: String,
    unique: true,
  },
  basePrice: Number,
  shippingPrice: Number,
  discountPrice: Number,
  finalPrice: Number,
  status: {
    type: String,
    enum: ['Pending', 'Done']
  },
  user: String,
}, { timestamps: true })


module.exports = mongoose.model('Payments', Payment)