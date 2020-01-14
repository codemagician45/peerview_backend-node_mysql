'use strict';

/**
 * @description This will get the unread messages
 */

const lib = require('../../lib');

const getMessageCount = (req, res, next) => {
  let user = req.$scope.user;

  return req.db
  .message
  .count({
    where: {
      [req.Op.and]: [{
        toId: user.id
      }, {
        isRead: false
      }],
    }
  })
  .then((messageCount) => {
    req.$scope.messageCount = messageCount;

    next();
    return messageCount;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.message get-message-count [message.count] Error');

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
  let messageCount = req.$scope.messageCount;
  let body = lib.response.createOk(messageCount);

  res.status(lib.httpCodes.OK).send(body);
};

module.exports.logic = getMessageCount;
module.exports.response = response;
