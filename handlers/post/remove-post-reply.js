'use strict';

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  replyId: { in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: Reply Id'
    }
  }
};

const removePostReply = (req, res, next) => {
  let user = req.$scope.user;
  let replyId = req.params.replyId;

  return req.db.reply.destroy({
    where: {
      id: {
        [req.Op.eq]: replyId
      },
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then((reply) => {
    next();
    return reply;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post remove-post-reply [reply.destroy] - Error');

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
  let post = req.$scope.post;
  let body = lib.response.createOk(post);

  res.status(lib.httpCodes.OK).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = removePostReply;
module.exports.response = response;
