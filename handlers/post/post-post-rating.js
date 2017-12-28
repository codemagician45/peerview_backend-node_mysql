'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Rating
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
        errorMessage: 'Invalid Resource: Post Id'
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
  let postId = req.$params.postId;
  let rating = req.$params.rating;

  return req.db.postRating.create({
    postId: postId,
    userId: user.id,
    rating: rating
  })
  .then(postRating => {
    next();
    return postRating;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postRating.create Error - post-post-rating');
  });
}

// check the average count of the rating
function averageRating (req, res, next) {
  let postId = req.$params.postId;
  const sequelize = req.db.postRating.sequelize;
  const colRating = sequelize.col([req.db.postRating.name, 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.post.findAll({
    attributes: [
      'id',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating']
    ],
    include: [{
      model: req.db.postRating,
      as: 'postRating',
      attributes: []
    }],
    group: ['post.id'],
    where: {
      id: {
        [req.Op.eq]: postId
      }
    }
  })
  .then(post => {
    post.length !== 0
    && post[0]
    && (post[0].newId = post[0].id + '_postRating');
    req.$scope.post = post[0];// use for updating credits

    next();
    return post;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.findAll Error - post-post-rating');
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
