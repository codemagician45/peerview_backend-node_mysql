'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update Job
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
  let bodySchema = {
    title: {
      notEmpty: {
        errorMessage: 'Missing Resource: Title'
      }
    },
    description: {
      notEmpty: {
        errorMessage: 'Missing Resource: Description'
      }
    },
    jobTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Job Type Id'
      }
    },
    hoursPerWeek: {
      notEmpty: {
        errorMessage: 'Missing Resource: Hours Per Week'
      }
    },
    pricePerHour: {
      notEmpty: {
        errorMessage: 'Missing Resource: Price Per Hour'
      }
    },
    location: {
      notEmpty: {
        errorMessage: 'Missing Resource: Location'
      }
    }
  };

  let paramsSchema = {
    jobId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Job Id'
      }
    }
  };

  req.checkBody(bodySchema);
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

function updateCampusJob (req, res, next) {
  let jobId = req.params.jobId;
  let title = req.$params.title;
  let description = req.$params.description;
  let jobTypeId = req.$params.jobTypeId;
  let hoursPerWeek = req.$params.hoursPerWeek;
  let pricePerHour = req.$params.pricePerHour;
  let location = req.$params.location;

  return req.db.job.update({
    title: title,
    description: description,
    jobTypeId: jobTypeId,
    hoursPerWeek: hoursPerWeek,
    pricePerHour: pricePerHour,
    location: location
  }, {
    where: {
      id: {
        [req.Op.eq]: jobId
      }
    }
  })
  .then(job => {
    req.$scope.job = job;
    next();
    return job;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'job.update Error - update-campus-job');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let job = req.$scope.job;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: job
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = updateCampusJob;
module.exports.response = response;
