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
  detail: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Detail'
    }
  },
  parentId: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Parent Id'
    }
  },
  fromId: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: From Id'
    },
    isInt: {
      errorMessage: 'Invalid Resource: From Id'
    }
  },
  toId: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: To Id'
    },
    isInt: {
      errorMessage: 'Invalid Resource: To Id'
    }
  }
};

const postMessage = (req, res, next) => {
  let body = req.$params;
  body.isRead = false;

  return req.db
  .message
  .create(body)
  .then((message) => {
    next();
    return message;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.message post-message [message.create] Error');

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
  let body = lib.response.created();

  res.status(lib.httpCodes.CREATED).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postMessage;
module.exports.response = response;
