'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Interest
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
        errorMessage: 'Invalid Resource: Interest Category Id'
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

/**
 * This will get the interest or sub-interest in the
 * current context provided the interestCategoryId
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getInterest (req, res, next) {
  let interestCategoryId = req.$params.interestCategoryId;

  return req.db.interest.findAll({
    where: {
      interestCategoryId: {
        [req.Op.eq]: interestCategoryId
      }
    }
  })
  .then(interests => {
    req.$scope.interests = interests;
    next();
    return interests;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'interest.findAll Error - get-interest');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let interests = req.$scope.interests;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: interests
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getInterest;
module.exports.response = response;
