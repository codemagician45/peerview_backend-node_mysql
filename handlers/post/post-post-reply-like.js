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

const postPostReplyLike = (req, res, next) => {
  let user = req.$scope.user;
  let replyId = req.params.replyId;

  return req.db.like.create({
    replyId: replyId,
    userId: user.id
  })
  .then((like) => {
    next();
    return like;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-reply-like [like.create] - Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
};

const response = (req, res) => {
  let body = lib.response.created();

  res.status(lib.httpCodes.CREATED).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postPostReplyLike;
module.exports.response = response;
