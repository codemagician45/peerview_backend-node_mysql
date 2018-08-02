'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Type Id
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
    typeCode: {
      notEmpty: {
        errorMessage: 'Missing Resource: Type Code'
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
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getUserTypeId (req, res, next) {
  let typeCode = req.$params.typeCode;

  return req.db.userType.findOne({
    where: {
      code: {
        [req.Op.eq]: typeCode.toLowerCase()
      }
    }
  })
  .then(userType => {
    req.$scope.userType = userType;
    next();
    return userType;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userType.findOne Error - get-user-type');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let userType = req.$scope.userType;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: userType
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getUserTypeId;
module.exports.response = response;
