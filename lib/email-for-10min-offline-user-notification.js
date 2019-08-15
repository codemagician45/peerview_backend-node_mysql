'use strict';

const config = require('../config');
const sendEmail = require('./email');
const pug = require('./pug');

function emailFore10minsOfflineUserNotification (subject, to, message) {
  let file = templates.emailPosts;

  let values = {
    email: `${user.email}`,
    username: `${user.firstName}`,
    loginurl: `${config.frontEnd.baseUrl}/community`,
    posts: posts,
    timelinePosts: timelineData,
    moment: require('moment')
  };

  pug.convert(file, values).then((content) => {
      return sendEmail.send(`Highlights on Peersview`, user.email, content);
  });
}

module.exports.tenMinsEmail = emailFore10minsOfflineUserNotification;
