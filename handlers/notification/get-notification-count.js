'use strict';

/**
 * @description This will get the unread notification
 */

const lib = require('../../lib');

const getNotificationCount = (req, res, next) => {
  let user = req.$scope.user;

  return req.db
  .notification
  .count({
    where: {
      [req.Op.and]: [{
        recipientId: user.id
      }, {
        isRead: false
      }],
    }
  })
  .then((messageCount) => {
    req.$scope.notificationCount = messageCount;

    next();
    return messageCount;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.notification get-notification-count [notification.count] Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
};

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
const response = (req, res) => {
  let messageCount = req.$scope.notificationCount;
  let body = lib.response.createOk(messageCount);

  res.status(lib.httpCodes.OK).send(body);
};

module.exports.logic = getNotificationCount;
module.exports.response = response;
