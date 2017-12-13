'use strict';

/**
 * @author Jo-Ries Canino
 * @description User new password
 */

const md5 = require('MD5');
const moment = require('moment');
const rpc = require('../lib/rpc');

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
  let schema = {
    passwordResetToken: {
      notEmpty: {
        errorMessage: 'Missing Resource: Password Reset Token'
      }
    },
    password: {
      notEmpty: {
        errorMessage: 'Missing Resource: Password'
      },
      isAscii: {
        errorMessage: `Invalid Resource: Should only contain ASCII characters only`
      },
      isLength: {
        options: [{
          min: 8,
          max: 24
        }],
        errorMessage: `Invalid Resource: Minimum 8 and maximum 24 characters are allowed`
      }
    },
    confirmPassword: {
      notEmpty: {
        errorMessage: 'Missing Resource: Confirm Password'
      }
    }
  };

  req.checkBody(schema);
  return req.getValidationResult()
  .then(validationErrors => {
    if (validationErrors.array().length !== 0) {
      return res.status(400)
      .send(new rpc.ValidationError(validationErrors.array()));
    }

    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));
  });
}

/**
 * This will test if our password and confirm_password
 * are equally the same
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function validatePasswordAndConfirmPassword (req, res, next) {// eslint-disable-line id-length
  let password = req.$params.password;
  let confirmPassword = req.$params.confirmPassword;

  if (password !== confirmPassword) {
    return res.status(400).send({
      status: 'ERROR',
      status_code: 102,
      status_message: 'confirm_password and password doesn\'t match',
      http_code: 400
    });
  }

  return next();
}

/**
 * This would be the fallback if password and
 * confirm password are equal
 * @see {@link validatePasswordAndConfirmPassword}
 * @see validatePasswordAndConfirmPassword
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function findUser (req, res, next) {
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
        status_message: 'Password reset token has been expired',
        http_code: 400
      });
    }

    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - post-set-new-password');
  });
}

/**
 * This would update the password and the
 * passwordresettoken of the user
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateUser (req, res, next) {
  let password = md5(req.$params.password);
  let token = req.$params.passwordResetToken;

  return req.db.user.update({
    password: password,
    passwordResetToken: null,
    tokenActiveDate: null
  }, {
    where: {
      passwordResetToken: token
    }
  })
  .then(user => {
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.update Error - post-set-new-password');
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
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.validatePasswordAndConfirmPassword = validatePasswordAndConfirmPassword;
module.exports.findUser = findUser;
module.exports.updateUser = updateUser;
module.exports.response = response;
