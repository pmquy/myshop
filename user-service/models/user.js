const mongoose = require('mongoose')

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  role: {
    type: String,
    enum: ['Admin', "Customer"]
  },
  salutation: String,
  addresses: [new mongoose.Schema({
    firstName: String,
    lastName: String,
    salutation: String,
    phoneNumber: String,
    province: String,
    district: String,
    ward: String,
    detail: String
  }, {_id: false})],
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model('Users', User)