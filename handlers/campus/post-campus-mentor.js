'use strict';

/**
 * @author Jo-Ries Canino
 * @description Campus Post Mentor
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
    campusId: {
      isInt: {
        errorMessage: 'Invalid Resource: Campus Id'
      }
    }
  };

  let bodySchema = {
    topic: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Topic'
      }
    },
    tellUsWhy: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Tell Us Why'
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

function postCampusMentor (req, res, next) {
  let campusId = req.$params.campusId;
  let topic = req.$params.topic;
  let tellUsWhy = req.$params.tellUsWhy;

  return req.db.job.mentor.create({
    campusId: campusId,
    topic: topic,
    tellUsWhy: tellUsWhy
  })
  .then(mentor => {
    req.$scope.mentor = mentor;
    next();
    return mentor;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'handlers.campus Error - post-campus-mentor [mentor.create]');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let mentor = req.$scope.mentor;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    data: mentor
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCampusMentor;
module.exports.response = response;
