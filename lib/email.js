'use strict';

const config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendGrid.apiKey);

function sendEmail (subject, to, message) {
  const msg = {
    to: to,
    from: 'admin@peersview.com',
    subject: subject,
    html: message,
  };

  sgMail.send(msg);
}

module.exports.send = sendEmail;
