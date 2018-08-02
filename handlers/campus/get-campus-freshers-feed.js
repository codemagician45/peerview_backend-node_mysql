'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Campus Freshers Feed
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

function getCampusFreshersFeed (req, res, next) {// eslint-disable-line id-length
  let campusId = req.$params.campusId;

  return req.db.campusFreshersFeed.findAll({
    where: {
      campusId: {
        [req.Op.eq]: campusId
      }
    }
  })
  .then(campusFreshersFeed => {
    req.$scope.campusFreshersFeed = campusFreshersFeed;
    next();
    return campusFreshersFeed;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusFreshersFeed.findAll Error - get-campus-freshers-feed');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusFreshersFeed = req.$scope.campusFreshersFeed;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campusFreshersFeed
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusFreshersFeed;
module.exports.response = response;
