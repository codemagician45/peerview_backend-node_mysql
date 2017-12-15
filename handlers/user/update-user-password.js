'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update User Password
 * This will be used after the post-user-forgot-password route
 */

const md5 = require('MD5');
const moment = require('moment');
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
    },
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  let paramsSchema = {
    jotToken: {
      notEmpty: {
        errorMessage: 'Missing Resource: Jot Token'
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
      status_message: `Password and Confirm Password Doesn't Match`,
      http_code: 400
    });
  }

  return next();
}

function updateUserPassword (req, res, next) {
  let token = req.$params.token;
  let jotToken = req.$params.jotToken;
  let decoded = lib.jwt.decode(jotToken, token);
  let password = md5(req.$params.password);

  return req.db.user.update({
    password: password
  }, {
    where: {
      [req.Op.and]: {
        email: decoded.email,
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
        status_message: `Invalid Resource: Token is Expired`,
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
    }, 'user.update Error - update-user-password');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) { // this will redirect the user in the login page(frond-end will do it)
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.validatePasswordAndConfirmPassword = validatePasswordAndConfirmPassword;
module.exports.logic = updateUserPassword;
module.exports.response = response;
