/*eslint-disable max-len*/
'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Posts
 */

const lib = require('../../lib');

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
          sequelize.fn('DISTINCT', sequelize.where(sequelize.col('postLike.userId'), user.id))), //check this if it is working or not
        'isUserPostLike'],
        [sequelize.fn('COUNT',
          sequelize.fn('DISTINCT', sequelize.where(sequelize.col('postShare.userId'), user.id))), //check this if it is working or not
        'isUserPostShare'],
        [sequelize.where(sequelize.col('post.userId'), user.id), 'isPostUser']
      ]
    },
    include: [{
      model: req.db.user,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture']
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
      attributes: []
    }, {
      model: req.db.postPollOption,
      attributes: []
    }],
    where: {
      postTo: {
        [req.Op.eq]: null
      }
    },
    group: ['post.id'],
    order: [['createdAt', 'DESC']],
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then((posts) => {
    return req.db.post.prototype.getPOSTREPLY(posts, req.db)
    .then(() => req.db.post.prototype.getATTACHMENTS(posts))
    .then(() => req.db.post.prototype.getPOSTPOLLOPTIONS(posts));
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
    posts: posts
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getPosts;
module.exports.response = response;
