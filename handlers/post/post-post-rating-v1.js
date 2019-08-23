'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Rating
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  postId: { in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: Post Id'
    }
  },
  rating: { in: ['body'],
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

/**
 * This would be the fallback if the user existed
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postPostRating (req, res, next) {
  let user = req.$scope.user;
  let postId = req.params.postId;
  let rating = req.$params.rating;

  req.db.rating.findAll({
    where: {
      [req.Op.and]: {
        userId: user.id,
        replyId: replyId
      }
    }
  }).then(rates => {
    if(rates.length > 0) {
      const query = req.db.rating.update({
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
      const query = req.db.rating.create({
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
module.exports.logic = postPostRating;
module.exports.response = response;
