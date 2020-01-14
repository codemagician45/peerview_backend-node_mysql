'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Campus Post Rating
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
        errorMessage: 'Invalid Resource: Campus Post Id'
      }
    },
  };

  let bodySchema = {
    rating: {
      notEmpty: {
        errorMessage: 'Missing Resource: Rating'
      },
      isFloat: {
        errorMessage: 'Invalid Resource: Rating'
      }
    }
  };

  req.checkParams(paramsSchema);
  req.checkBody(bodySchema);
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
 * In which if the user is still unverified
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
  let campusPostId = req.$params.postId;
  let rating = req.$params.rating;

  return req.db.campusPostRating.create({
    campusPostId: campusPostId,
    userId: user.id,
    rating: rating
  })
  .then(campusPostRating => {
    next();
    return campusPostRating;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPostRating.create Error - post-campus-post-rating');
  });
}

// check the average count of the rating
function averageRating (req, res, next) {
  let campusPostId = req.$params.postId;
  const sequelize = req.db.campusPostRating.sequelize;
  const colRating = sequelize.col([req.db.campusPostRating.name, 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.campusPost.findAll({
    attributes: [
      'id',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating']
    ],
    include: [{
      model: req.db.campusPostRating,
      as: 'campusPostRating',
      attributes: []
    }],
    group: ['campusPost.id'],
    where: {
      id: {
        [req.Op.eq]: campusPostId
      }
    }
  })
  .then(campusPost => {
    next();
    return campusPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPost.findAll Error - post-campus-post-rating');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postPostRating;
module.exports.averageRating = averageRating;
module.exports.response = response;
