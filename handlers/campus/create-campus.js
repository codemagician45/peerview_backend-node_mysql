'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Campus Job
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
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Campus Name'
      }
    },
    email: {
        notEmpty: {
          errorMessage: 'Missing Resource: Campus Email'
        }
    },
    enrollment_year: {
        notEmpty: {
          errorMessage: 'Missing Resource: Campus Enrollment Year'
        }
    },
    logo: {
        notEmpty: {
          errorMessage: 'Missing Resource: Campus Logo'
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

function createCampus (req, res, next) {
  let name = req.$params.name;
  let email = req.$params.email;
  let enrollment_year = req.$params.enrollment_year;
  let logo = req.$params.logo;

  return req.db.campus.create({
    name: name,
    email: email,
    enrollment_year: enrollment_year,
    logo: logo
  })
  .then(campus => {
    req.$scope.campus = campus;
    next();
    return campus;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusJob.findOne Error - get-campus-job');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campus = req.$scope.campus;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campus
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = createCampus;
module.exports.response = response;
