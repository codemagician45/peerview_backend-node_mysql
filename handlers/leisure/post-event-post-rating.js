'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Event Post Rating
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
    eventPostId: {
      isInt: {
        errorMessage: 'Invalid Resource: Event Post Id'
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
function postEventPostRating (req, res, next) {
  let user = req.$scope.user;
  let eventPostId = req.$params.eventPostId;
  let rating = req.$params.rating;

  return req.db.eventPostRating.create({
    eventPostId: eventPostId,
    userId: user.id,
    rating: rating
  })
  .then(eventPostRating => {
    next();
    return eventPostRating;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventPostRating.create Error - post-event-post-rating');
  });
}

// check the average count of the rating
function averageRating (req, res, next) {
  let eventPostId = req.$params.eventPostId;
  const sequelize = req.db.eventPostRating.sequelize;
  const colRating = sequelize.col([req.db.eventPostRating.name, 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.eventPost.findAll({
    attributes: [
      'id',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating']
    ],
    include: [{
      model: req.db.eventPostRating,
      as: 'eventPostRating',
      attributes: []
    }],
    group: ['eventPost.id'],
    where: {
      id: {
        [req.Op.eq]: eventPostId
      }
    }
  })
  .then(eventPost => {
    eventPost.length !== 0
    && eventPost[0]
    && (eventPost[0].newId = eventPost[0].id + '_eventPostRating');
    req.$scope.post = eventPost[0];// use for updating credits
    next();
    return eventPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventPost.findAll Error - post-event-post-rating');
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
module.exports.logic = postEventPostRating;
module.exports.averageRating = averageRating;
module.exports.response = response;
