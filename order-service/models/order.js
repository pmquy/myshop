const mongoose = require('mongoose')

const Order = new mongoose.Schema({
  user: String,
  status: String,
  items: [new mongoose.Schema({
    product: String,
    quantity: Number,
    option: Object,
  }, { _id: false })],
  address: new mongoose.Schema({
    firstName: String,
    lastName: String,
    salutation: String,
    phoneNumber: String,
    province: String,
    district: String,
    ward: String,
    detail: String
  }, { _id: false }),
  note: String,
  code: String,
}, { timestamps: true })

module.exports = mongoose.model('Orders', Order)