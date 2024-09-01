const mongoose = require('mongoose')

const Shipping = new mongoose.Schema({
  order: {
    type: String,
    unique: true,
  },
  shippingCode: String,
  user: String,
  provider: {
    type: String,
    enum: ["GHN", "GHTK", "VNPOST", "VTPOST", "J&T"]
  },
  status: {
    type: String,
    enum: ["Created", "Done"]
  }
}, { timestamps: true })

module.exports = mongoose.model("Shippings", Shipping)