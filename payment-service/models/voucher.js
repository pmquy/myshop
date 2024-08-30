const mongoose = require('mongoose')

const Voucher = new mongoose.Schema({
  user: String,
  quantity: Number,
  code: {
    type: String,
    unique: true,
  },
  type: {
    type: String,
    enum: ["Fixed", "Percentage"]
  },
  description: String,
  amount: Number
})

module.exports = mongoose.model('Vouchers', Voucher)