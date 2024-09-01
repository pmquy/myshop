const mongoose = require('mongoose')

const Rating = new mongoose.Schema({
  comment: String,
  user: String,
  displayName: String,
  product: String,
  star: Number,
  status: {
    type: String,
    enum: ["Pending", "Done"]
  }
}, { timestamps: true })

module.exports = mongoose.model("Ratings", Rating)