// email services functions!
const config = require('config');
const nodemailer = require('nodemailer');

let mail = {};
mail.sendmail = async function (mailOptions) {
  try {
    let transporter = nodemailer.createTransport(config.get('smtpConfig'));
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return false;
  }
};

module.exports = mail;
