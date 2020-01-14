'use strict';

/**
 * @author Jo-Ries Canino
 * @description User Registration
 */

const lib = require('../../lib');
const templates = require('../../templates');
const config = require('../../config');

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
    email: {
      notEmpty: {
        errorMessage: 'Missing Resource: Email'
      },
      isEmail: {
        errorMessage: 'Invalid Resource: Email'
      }
    }
  };

  req.checkBody(schema);
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

function postUserVerifyEmailResend (req, res, next) {// eslint-disable-line id-length
  let email = req.$params.email;

  return req.db.user.findOne({
    where: {
      email: email
    }
  })
  .then(user => {
    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findOne Error - post-user-verify-email-resend');
  });
}

/**
 * Send an Email
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function sendEmail (req, res, next) {
  let user = req.$scope.user;
  let token = user.token;
  let email = req.$params.email;
  let name = `${user.firstName} ${user.lastName}`;
  let file = templates.emailVerification;

  let jotToken = lib.jwt.encode({
    userId: user.id
  }, token);

  let values = {
    name: name,
    verifyEmailUrl: `${config.frontEnd.baseUrl}/verify-email/${jotToken}?token=${token}`
  };

  lib.pug.convert(file, values)
  .then(content => {
    return lib.email.send(`Thanks for joining Peersview`, email, content);
  })
  .then(pug => {
    next();
    return pug;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'pug.convert Error - post-user-register');
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
module.exports.postUserVerifyEmailResend = postUserVerifyEmailResend;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
