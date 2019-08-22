'use strict';

const lib = require('../../lib');

const querySchema = {
  postReplyId: {
    in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: Post Reply Id'
    }
  },
  rating: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Rating'
    },
    isFloat: {
      errorMessage: 'Invalid Resource: Rating',
      options: {
        min: 1,
        max: 5
      }
    }
  }
};

function postPostReplyRating (req, res, next) {
  const user = req.$scope.user;
  const replyId = Number(req.params.replyId);
  const rating = req.$params.rating;

  const query = req.db.postv1ReplyRating.create({
    rating: rating,
    userId: user.id,
    replyId: replyId
  });
  return query.then(rating => {
    next();
    return rating;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-reply-rating-v1 [rating.create] - Error');
    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
}

const response = (req, res) => {
  let body = lib.response.created();
  res.status(lib.httpCodes.CREATED)
  .send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postPostReplyRating;
module.exports.response = response;
