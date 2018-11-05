/*eslint-disable max-len*/
'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Posts
 */

const lib = require('../../lib');
const moment = require('moment');

/**
 * Initialized the schema Object
 */
const querySchema = {
  offset: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Offset'
    }
  },
  limit: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Limit'
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
function getPosts (req, res, next) {
  let user = req.$scope.user;
  let offset = lib.utils.returnValue(req.$params.offset);
  let limit = lib.utils.returnValue(req.$params.limit);

  return req.db.postv1.findAll({
    include: [{
      model: req.db.rating,
      as: 'rating',
      attributes: []
    }, {
      model: req.db.like,
      as: 'like',
      attributes: []
    }, {
      model: req.db.reply,
      as: 'reply',
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }, {
      model: req.db.pageview,
      as: 'pageview',
      attributes: []
    }, {
      model: req.db.postv1,
      as: 'share',
      attributes: []
    }, {
      model: req.db.rating,
      as: 'rating',
      attributes: []
    }, {
      model: req.db.postv1,
      as: 'originalPost'
    }, {
      model: req.db.attachment,
      attributes: ['id', 'cloudinaryPublicId']
    }, {
      model: req.db.pollOption,
      attributes: []
    }],
    where: {
      postTo: {
        [req.Op.eq]: null
      },
      [req.Op.or]: [{
        expiration: {
          [req.Op.eq]: null
        }
      }, {
        expiration: {
          [req.Op.gt]: moment()
        }
      }]
    },
    order: [['createdAt', 'DESC']],
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then((posts) => {
    return req.db.postv1.prototype.getReplyCount(posts, req.db)
    .then(() => req.db.postv1.prototype.getLikeCount(posts, req.db))
    .then(() => req.db.postv1.prototype.getPageViewCount(posts, req.db))
    .then(() => req.db.postv1.prototype.getShareCount(posts, req.db))
    .then(() => req.db.postv1.prototype.isUserPostLike(posts, req.db, user.id))
    .then(() => req.db.postv1.prototype.isUserPostShare(posts, req.db, user.id))
    .then(() => req.db.postv1.prototype.isPostUser(posts, req.db, user.id));
  })
  .then((posts) => {
    req.$scope.posts = posts;
    next();
    return posts;
  })
  .catch(error => {
    req.log.error({
      error: error
    }, 'handlers.post get-post-list-v1 [postv1.findAll] Error');

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
function response (req, res) {
  let posts = req.$scope.posts;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: posts
  };

  res.status(200).send(body);
}

module.exports.querySchema = querySchema;
module.exports.logic = getPosts;
module.exports.response = response;