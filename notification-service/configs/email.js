const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lokikurri@gmail.com",
    pass: "kzss layx dttj idoo"
  },
  from: "lokikurri@gmail.com"
});

module.exports = {transporter}