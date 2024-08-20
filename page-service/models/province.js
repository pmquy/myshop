const mongoose = require('mongoose')

const Ward = new mongoose.Schema({
  name: String,
})

const District = new mongoose.Schema({
  name: String,
  wards: [Ward]
})

const Province = new mongoose.Schema({
  name: String,
  districts: [District]
})

module.exports = mongoose.model('Provinces', Province)