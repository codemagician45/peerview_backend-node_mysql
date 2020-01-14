'use strict';

/**
 * This cron will fetch all data with
 * in the user_invite table for all invites
 * which marks isRead=false
 */
const moment = require('moment');
const CronJob = require('cron').CronJob;
const db = require('../../lib/db');
const lib = require('../../lib');
const config = require('../../config');
const log = require('bunyan').createLogger(config.appLog);
const templates = require('../../templates');

async function startEmailResender () {
  let userInviteResult = await db.models.userInvite.findAll({
    include: [{
      model: db.models.user,
      as: 'userInviter'
    }],
    where: {
      isRead: {
        [db.Sequelize.Op.eq]: false
      }
    }
  })
  .catch(error => {
    log.error({
      err: error.message
    }, 'userInvite.create Error - post-user-invite-peers');
  });

  await userInviteResult.forEach(async (userInvite) => {
    let userInviteDate =  moment(userInvite.createdAt).utc();
    let currentDate =  moment(new Date()).utc();
    //check if the userInvite falls in the ffg;
    if (currentDate.diff(userInviteDate, 'days') === 3) {
      await sendEmail(userInvite, 3);
    } else if (currentDate.diff(userInviteDate, 'days') === 7) {
      await sendEmail(userInvite, 7);
    } else if (currentDate.diff(userInviteDate, 'days') === 15) {
      await sendEmail(userInvite, 15);
    } else if (currentDate.diff(userInviteDate, 'days') === 30) {
      await sendEmail(userInvite, 30);
    }
  });

  log.info('Finish...');
}

/**
 * Send an Email
 */
async function sendEmail (userInvite, numberOfDays) {
  let emailToInvite = userInvite.emailToInvite;
  let file = templates.invitePeersResend;

  let values = {
    emailToInvite: emailToInvite,
    numberOfDays: numberOfDays
  };

  lib.pug.convert(file, values)
  .then(content => {
    return lib.email.send(`We’re feeling a little lonely...`, emailToInvite, content);
  })
  .then(pug => {
    return pug;
  })
  .catch(error => {
    log.error({
      err: error.message
    }, 'pug.convert Error - email-resender');
  });
}

return new CronJob({
  cronTime: '00 00 00 * * *',
  onTick: function () {
    log.info('Cron is starting...');
    startEmailResender();
  },
  start: true
});
