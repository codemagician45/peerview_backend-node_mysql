/*eslint-disable max-len*/
'use strict';

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  limit: { in: ['query'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Limit'
    }
  },
  offset: { in: ['query'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Offset'
    }
  },
  state: { in: ['query'],
    optional: true,
    isIn: {
      options: ['unread', 'read'],
      errorMessage: 'Invalid Resource: State'
    }
  }
};

const getNotificationList = (req, res, next) => {
  const user = req.$scope.user;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  let where = {
    recipientId: user.id
  };

  if (req.$params.state) {
    where.isRead = state[req.$params.state];
  }

  return req.db
  .notification
  .findAndCountAll({
    include: [{
      model: req.db.user,
      as: 'subject',
    }, {
      model: req.db.post,
      as: 'post',
    }, {
      model: req.db.course,
      as: 'course',
    }, {
      model: req.db.postv1,
      as: 'postv1',
    }],
    where: where,
    order: [['createdAt', 'DESC']],
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
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
