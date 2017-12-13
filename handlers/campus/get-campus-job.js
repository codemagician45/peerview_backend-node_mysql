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
    jobId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Job Id'
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

function getCampusJob (req, res, next) {
  let jobId = req.params.jobId;

  return req.db.job.findOne({
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
      err: error
    }, 'job.findOne Error - get-campus-job');
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
    job: job
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusJob;
module.exports.response = response;
