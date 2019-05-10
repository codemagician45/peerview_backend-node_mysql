'use strict';

const lib = require('../../lib');

function validateParams (req, res, next) {
  let paramsSchema = {
    postReplyId: {
      isInt: {
        errorMessage: 'Invalid Resource: Post Reply Id'
      }
    }
  };

  req.checkParams(paramsSchema);
  return req.getValidationResult()
  .then(validationErrors => {
    if (validationErrors.array().length !== 0) {
      return res.status(400)
      .send(new lib.rpc.ValidationError(validationErrors.array()));
    }

    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));
  });
}

const postPostCommentLike = (req, res, next) => {
  let user = req.$scope.user;
  let postReplyId = req.params.postReplyId;

  return req.db.postReplyLike.create({
    postReplyId: postReplyId,
    userId: user.id
  })
  .then((like) => {
    next();
    return like;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-comment-like [like.create] - Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
};

const response = (req, res) => {
  let body = lib.response.created();

  res.status(lib.httpCodes.CREATED).send(body);
};

module.exports.validateParams = validateParams;
module.exports.logic = postPostCommentLike;
module.exports.response = response;
