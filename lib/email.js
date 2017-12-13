'use strict';

const nodemailer = require('nodemailer');

function sendEmail (subject, to, message) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    });

    let mailOptions = {
      from: 'admin@peersview.com',
      to: to,
      subject: subject,
      html: message
    };

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        return reject(error);
      }

      return resolve(response);
    });
  });
}

module.exports.send = sendEmail;
