'use strict';

const sendEmail = require('./email');
const pug = require('./pug');
const moment = require('moment');

function emailFore10minsOfflineUserNotification (req, subject, file, values, to) {

  const timeoutObj = setTimeout(() => {
    req.db.user.findAll({
      where: {
        id: {
          [req.Op.eq]: to.id
        }
      }
    }).then((users) => {
      console.log('email test', users);
      if(users && users.length > 0) {
        let user = users[0];
        let currentDate = moment();
        let lastActivityTime = moment(user.last_logging_time);
        var ms = currentDate.diff(lastActivityTime);
        var mins = ms / 1000 / 60;
  
        if(mins > 10) {
          pug.convert(file, values).then((content) => {
              return sendEmail.send(subject, to.email, content);
          });
        }
      }
    })
  }, 10 * 60 * 1000);
}

module.exports.tenMinsEmail = emailFore10minsOfflineUserNotification;
