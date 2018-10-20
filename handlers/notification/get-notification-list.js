/*eslint-disable max-len*/
'use strict';

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  state: { in: ['query'],
    isIn: {
      options: ['unread', 'read'],
      errorMessage: 'Invalid Resource: State'
    }
  }
};

const getNotificationList = (req, res, next) => {
  const user = req.$params.user;
  let query = {
    subject: user.id
  };

  if (req.$params.state) {
    query.isRead = state[req.$params.state];
  }

  return req.db
  .notification
  .findAndCountAll({
    where: query,
    limit: 10
  })
  .then(notificationList => {
    req.$scope.notificationList = notificationList;

    next();
    return notificationList;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.notification get-notification-list [notification.findAndCountAll] Error');

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
  let notificationList = req.$scope.notificationList;
  let body = lib.response.createOk(notificationList);

  res.status(lib.httpCodes.OK).send(body);
};

const state = {
  'unread': false,
  'read': true
};

module.exports.querySchema = querySchema;
module.exports.logic = getNotificationList;
module.exports.response = response;
