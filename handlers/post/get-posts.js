/*eslint-disable max-len*/
'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Posts
 */

const lib = require('../../lib');
const moment = require('moment');

/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function validateParams (req, res, next) {
  let paramsSchema = {
    offset: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Offset'
      }
    },
    limit: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Limit'
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
  const sequelize = req.db.postRating.sequelize;
  const colRating = sequelize.col('postRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.post.findAll({
    attributes: {
      include: [
        'id',
        'message',
        'title',
        'createdAt',
        [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postRating.id'))), 'ratingCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postReply.id'))), 'postReplyCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postLike.id'))), 'likeCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postPageview.id'))), 'pageviewCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postShare.id'))), 'shareCount'],
        [sequelize.fn('COUNT',
          sequelize.fn('DISTINCT', sequelize.where(sequelize.col('postShare.userId'), user.id))), //check this if it is working or not
        'isUserPostShare'],
        [sequelize.where(sequelize.col('post.userId'), user.id), 'isPostUser']
      ]
    },
    include: [{
      model: req.db.user,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture', 'socialImage'],
      include: [{
        model: req.db.userCredits,
        attributes: [
          [sequelize.fn('SUM',
            sequelize.col('credits')), 'totalCredits'],
        ],
      }]
    }, {
      model: req.db.postRating,
      as: 'postRating',
      attributes: []
    }, {
      model: req.db.postLike,
      as: 'postLike',
      attributes: []
    }, {
      model: req.db.postReply,
      as: 'postReply',
      attributes: []
    }, {
      model: req.db.postPageview,
      as: 'postPageview',
      attributes: []
    }, {
      model: req.db.post,
      foreignKey: 'sharePostId',
      as: 'postShare',
      attributes: []
    }, {
      model: req.db.attachment,
      attributes: ['id', 'cloudinaryPublicId']
    }, {
      model: req.db.postPollOption,
      as: 'postPollOption',
      attributes: []
    }],
    where: {
      postTo: {
        [req.Op.eq]: null
      },
      [req.Op.or]: [{
        pollExpiration: {
          [req.Op.eq]: null
        }
      }, {
        pollExpiration: {
          [req.Op.gt]: moment()
        }
      }]
    },
    group: ['post.id', 'post.userId'],
    order: [['createdAt', 'DESC']],
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then((posts) => {
    return req.db.post.prototype.getPOSTREPLY(posts, req.db)
    .then(() => req.db.post.prototype.getATTACHMENTS(posts))
    .then(() => req.db.post.prototype.getPOSTPOLLOPTIONS(posts, req.db))
    .then(() => req.db.post.prototype.getIfUserAlreadyVoted(posts, user.id))
    .then(() => req.db.post.prototype.getPOSTSHARE(posts, req))
    .then(() => req.db.post.prototype.getPOSTLIKES(posts, req));
  }).then(async (posts) => {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await req.db.postReply.prototype.isUserPostReplyLike(post.dataValues.postReply, req.db, user.id);
      post.dataValues.postReply = contents;
      return post;
    }));
    return posts;
  })
  .then(async (posts) => {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await req.db.postReply.prototype.isUserPostReplyRating(post.dataValues.postReply, req.db, user.id);
      post.dataValues.postReply = contents;
      return post;
    }));
    return posts;
  })
  .then((posts) => {
    return req.db.post.prototype.isUserPostLike(posts, req.db, user.id);
  })
  .then((posts) => {
    req.$scope.posts = posts;
    next();
    return posts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.findAll Error - get-posts');
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

module.exports.validateParams = validateParams;
module.exports.logic = getPosts;
module.exports.response = response;
