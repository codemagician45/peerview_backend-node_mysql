'use strict';

/**
 * This cron will fetch all data when
 * there is a change in a certain post
 */
const CronJob = require('cron').CronJob;
const db = require('../../lib/db');
const lib = require('../../lib');
const config = require('../../config');
const log = require('bunyan').createLogger(config.appLog);
const templates = require('../../templates');

async function postFollowNotification () {// eslint-disable-line id-length
  // get the queue here
  let communityPostFollowCronQueue = await db.models// eslint-disable-line id-length
  .communityPostFollowCronQueue.findAll({
    order: [['createdAt', 'ASC']]
  });

  for (let key in communityPostFollowCronQueue) {
    await getPostFollowUsers(communityPostFollowCronQueue[key].communityPostId);
  }
}

async function getPostFollowUsers (communityPostId) {
  let communityPostFollow = await db.models.communityPostFollow.findAll({
    include: [{
      model: db.models.user,
      attributes: ['id', 'firstName', 'lastName', 'email']
    }, {
      model: db.models.communityPost
    }],
    where: {
      communityPostId: {
        [db.Sequelize.Op.eq]: communityPostId
      }
    }
  });

  for (let key in communityPostFollow) {
    sendEmail(communityPostFollow[key].user, communityPostFollow[key]);
  }
}

/**
 * Send an Email
 */
async function sendEmail (user, communityPostFollowCronQueue) {// eslint-disable-line id-length
  let userName = `${user.firstName} ${user.lastName}`;
  let communityPost = communityPostFollowCronQueue.communityPost;
  let title = communityPost.message || communityPost.title || communityPost.question;
  let file = templates.postFollowUpdate;

  let values = {
    title: title.substr(0, 32),
    userName: userName
  };


  lib.pug.convert(file, values)
  .then(content => {
    return lib.email.send(`Recent update on: ${title}...`, user.email, content);
  })
  .then(() => {
    return db.models.communityPostFollowCronQueue.destroy({
      where: {
        id: {
          [db.Sequelize.Op.eq]: communityPostFollowCronQueue.id
        }
      }
    });
  })
  .then(communityPostFollowCronQueue => {// eslint-disable-line id-length
    return communityPostFollowCronQueue;
  })
  .catch(error => {
    log.error({
      err: error.message
    }, 'pug.convert Error - email-resender');
  });
}

return new CronJob({
  cronTime: '00 */10 * * * *',
  onTick: function () {
    log.info('Cron is starting...');
    postFollowNotification();
  },
  start: true
});
