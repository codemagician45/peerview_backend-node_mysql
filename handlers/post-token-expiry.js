'use strict';

/**
 * @author Jo-Ries Canino
 * @description Token expiration
 */

const moment = require('moment');
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
  let bodySchema = {
    passwordResetToken: {
      notEmpty: {
        errorMessage: 'Missing Resource: Password Reset Token'
      }
    }
  };

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
 * Check if the token is already expired
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function checkTokenExpiry (req, res, next) {
  let passwordResetToken = req.$params.passwordResetToken;

  return req.db.user.findOne({
    where: {
      [req.Op.and]: {
        passwordResetToken: passwordResetToken,
        tokenActiveDate: {
          [req.Op.gte]: moment(new Date())
        }
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Reset password link has been expired',
        http_code: 400
      });
    }

    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - post-token-expiry');
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
    http_code: 200,
    status_message: 'Password reset link is valid'
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = checkTokenExpiry;
module.exports.response = response;
