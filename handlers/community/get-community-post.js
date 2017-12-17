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

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkParams(paramsSchema);
  req.checkHeaders(headerSchema);
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
  const colRating = sequelize.col(['communityPostRating', 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.communityPost.findAll({
    attributes: [
      'message',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostPageview', 'userId'].join('.'))), 'pageviewCount'],
    ],
    include: [{
      model: req.db.communityPostRating,
      as: 'communityPostRating',
      attributes: []
    }, {
      model: req.db.communityPostLike,
      as: 'communityPostLike',
      attributes: []
    }, {
      model: req.db.communityPostPageview,
      as: 'communityPostPageview',
      attributes: []
    }, {
      model: req.db.communityPostReply,
      as: 'communityPostReply',
      attributes: ['comment'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }],
    group: ['communityPost.id'],
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
      err: error
    }, 'postLike.create Error - get-community-post');
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
    communityPost: !communityPost ? null : communityPost
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCommunityPost;
module.exports.response = response;
