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

  req.db.postv1ReplyRating.findAll({
    where: {
      [req.Op.and]: {
        userId: user.id,
        replyId: replyId
      }
    }
  }).then(rates => {
    if(rates.length > 0) {
      const query = req.db.postv1ReplyRating.update({
        rating: rating
      }, {
        where: {
          [req.Op.and]: {
            userId: user.id,
            replyId: replyId
          }
        }
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
    } else {
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
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-reply-rating-v1 [rating.create] - Error');
    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
}

function getReply (req, res, next) {
  const user = req.$scope.user;
  const replyId = Number(req.params.replyId);
  const sequelize = req.db.reply.sequelize;

  return req.db.reply.findAll({
    attributes: [
      'id', 'comment', 'hideComment',
      [sequelize.fn('COUNT', sequelize.col('ratings.id')), 'replyLikeCount'],
      [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('ratings.rating'))), 'roundedRating'],
      [sequelize.where(sequelize.col('ratings.userId'), user.id), 'isReplyLikeUser']
    ],
    include: [
      {
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email', 'socialImage', 'profilePicture', 'institutionName', 'schoolName']
      },
      {
        model: req.db.postv1ReplyRating,
        as: 'ratings',
        attributes: [
          'id', 'rating', 'userId', 'replyId'
        ]
      },
      {
        model: req.db.attachment,
        as: 'attachment',
      }
    ],
    group: ['id'],
    where: {
      id: {
        [req.Op.eq]: replyId
      }
    }
  })
  .then((replies) => {
    req.$scope.updatedReply = replies[0];
    next();
    return replies;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.findAll Error - get-post');
  });
}

const response = (req, res) => {
  let data = req.$scope.updatedReply;

  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    data: data
  };

  res.status(lib.httpCodes.CREATED)
  .send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postPostReplyRating;
module.exports.getReply = getReply;
module.exports.response = response;
