'use strict';

/**
 * @author Jo-Ries Canino
 * @description POST Message
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  parentId: { in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: Parent Id'
    }
  },
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
  }
};

const getMessageListByParentId = (req, res, next) => {// eslint-disable-line id-length
  let user = req.$scope.user;
  let parentId = req.params.parentId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;

  return req.db
  .message
  .findAll({
    include: [{
      model: req.db.user,
      as: 'from',
      attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'socialImage']
    }, {
      model: req.db.user,
      as: 'to',
      attributes: ['id', 'firstName', 'lastName', 'profilePicture', 'socialImage', 'city']
    }],
    where: {
      [req.Op.or]: [{
        id: parentId
      }, {
        parentId: parentId
      }],
      [req.Op.and]: {
        [req.Op.or]: [{
          fromId: user.id
        }, {
          toId: user.id
        }]
      }
    },
    order: [
      ['createdAt', 'DESC']
    ],
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then((messageList) => {
    req.$scope.messageList = messageList;

    next();
    return messageList;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.message get-message-list-by-parent-id [message.findAll] Error');

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
  let messageList = req.$scope.messageList;
  let body = lib.response.createOk(messageList);

  res.status(lib.httpCodes.OK).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = getMessageListByParentId;
module.exports.response = response;
