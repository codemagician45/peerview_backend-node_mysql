'use strict';

const config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendGrid.apiKey);

function sendEmail (subject, to, message) {
  const msg = {
    to: to,
    from: 'Peersview <admin@peersview.com>',
    subject: subject,
    html: message,
  };

  return sgMail.send(msg);
}

module.exports.send = sendEmail;
