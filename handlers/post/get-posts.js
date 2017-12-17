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
  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

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

function getPosts (req, res, next) {
  const sequelize = req.db.postRating.sequelize;
  const colRating = sequelize.col([req.db.postRating.name, 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.post.findAll({
    attributes: [
      'message',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['postRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postPageview', 'userId'].join('.'))), 'pageviewCount'],
    ],
    include: [{
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
      attributes: ['comment'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }, {
      model: req.db.postPageview,
      as: 'postPageview',
      attributes: []
    }],
    group: ['post.id']
  })
  .then(posts => {
    req.$scope.posts = posts;
    next();
    return posts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
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
