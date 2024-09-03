const mongoose = require('mongoose')

const Notification = new mongoose.Schema({
  user: String,
  message: String,
  link: String,
}, {timestamps: true})

module.exports = mongoose.model("Notifications", Notification)