'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Campus Jobs
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
      notEmpty: {
        errorMessage: 'Missing Resource: Campus Id'
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

function getCampusJobs (req, res, next) {
  let campusId = req.$params.campusId;
  return req.db.job.findAll({
    where: {
      campusId: {
        [req.Op.eq]: campusId
      }
    }
  })
  .then(jobs => {
    req.$scope.jobs = jobs;
    next();
    return jobs;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'job.findAll Error - get-jobs');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let jobs = req.$scope.jobs;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    jobs: jobs
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusJobs;
module.exports.response = response;
