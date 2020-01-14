'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get a specific Post
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
    postId: {
      isInt: {
        errorMessage: 'Missing Resource: Campus Post Id'
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

function getCampusPost (req, res, next) {
  let campusPostId = req.$params.postId;
  let campusFreshersFeedId = req.$params.campusFreshersFeedId;
  const sequelize = req.db.campusPostRating.sequelize;
  const colRating = sequelize.col([req.db.campusPostRating.name, 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.campusPost.findAll({
    attributes: [
      'message',
      'createdAt',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['campusPostRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['campusPostLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['campusPostPageview', 'userId'].join('.'))), 'pageviewCount']
    ],
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName']
    }, {
      model: req.db.campusPostRating,
      as: 'campusPostRating',
      attributes: []
    }, {
      model: req.db.campusPostLike,
      as: 'campusPostLike',
      attributes: []
    }, {
      model: req.db.campusPostReply,
      as: 'campusPostReply',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }, {
      model: req.db.campusPostPageview,
      as: 'campusPostPageview',
      attributes: []
    }],
    group: ['campusPost.id'],
    where: {
      id: {
        [req.Op.eq]: campusPostId
      },
      [req.Op.or]: [{
        campusFreshersFeedId: campusFreshersFeedId
      }]
    }
  })
  .then(campusPost => {
    req.$scope.campusPost = campusPost[0];
    next();
    return campusPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPost.findAll Error - get-campus-post');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusPost = req.$scope.campusPost;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campusPost
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusPost;
module.exports.response = response;
