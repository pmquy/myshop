const mongoose = require('mongoose')

const Rating = new mongoose.Schema({
  comment: String,
  star: Number,
  user: String,
  displayName: String,
  product: String,
  status: {
    type: String,
    enum: ["Pending", "Done"]
  }
}, { timestamps: true })

module.exports = mongoose.model("Ratings", Rating)