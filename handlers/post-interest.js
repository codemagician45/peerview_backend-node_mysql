'use strict';

/**
 * @author Jo-Ries Canino
 * @description Add new Interest based on the interest category
 */

const lib = require('../lib');

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
    interestCategoryId: {
      isInt: {
        errorMessage: 'Invalid Resource: Interest CategoryId Id'
      }
    },
  };

  let bodySchema = {
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Name'
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

function postInterest (req, res, next) {
  let interestCategoryId = req.$params.interestCategoryId;
  let name = req.$params.name;

  return req.db.interest.create({
    name: name,
    interestCategoryId: interestCategoryId
  })
  .then(interest => {
    req.$scope.interest = interest;
    next();
    return interest;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'interest.create Error - post-interest');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let interest = req.$scope.interest;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    data: interest
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postInterest;
module.exports.response = response;
