'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get a specific Community Post
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
    communityPostId: {
      isInt: {
        errorMessage: 'Invalid Resource: Community Post Id'
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

function getCommunityPost (req, res, next) {
  let communityPostId = req.$params.communityPostId;
  const sequelize = req.db.communityPostRating.sequelize;
  const colRating = sequelize.col(['postRating', 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.communityPost.findAll({
    attributes: [
      'id',
      'message',
      'createdAt',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['postRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postPageview', 'userId'].join('.'))), 'pageviewCount'],
    ],
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture']
    }, {
      model: req.db.communityPostRating,
      as: 'postRating',
      attributes: []
    }, {
      model: req.db.communityPostLike,
      as: 'postLike',
      attributes: []
    }, {
      model: req.db.communityPostPageview,
      as: 'postPageview',
      attributes: []
    }, {
      model: req.db.communityPostReply,
      as: 'postReply',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }],
    group: ['communityPost.id', 'postReply.id'],
    where: {
      id: {
        [req.Op.eq]: communityPostId
      }
    }
  })
  .then(communityPost => {
    req.$scope.communityPost = communityPost[0];
    next();
    return communityPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPost.findAll Error - get-community-post');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let communityPost = req.$scope.communityPost;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: !communityPost ? null : communityPost
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCommunityPost;
module.exports.response = response;
