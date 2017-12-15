'use strict';

/**
 * @author Jo-Ries Canino
 * @description User forgot password
 * This is connected to update-user-password route
 */

const randomstring = require('randomstring');
const moment = require('moment');
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

/**
 * Finding a user if existed in the the database
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function findUser (req, res, next) {
  let email = req.$params.email;

  return req.db.user.findOne({
    where: {
      [req.Op.and]: {
        email: email,
        password: {
          [req.Op.ne]: null
        }
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Email is not registered with us. Or email has been used for social login', // eslint-disable-line max-len
        http_code: 400
      });
    }

    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - post-user-forgot-password');
  });
}

/**
 * This would be the fallback if the user is existed
 * Then update the passwordresettoken of the user
 * @see {@link findUser}
 * @see findUser
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postUserForgotPassword (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let token = randomstring.generate();
  req.$scope.token = token;

  return req.db.user.update({
    token: token,
    tokenActiveDate: moment(new Date()).add(24, 'hour')
  }, {
    where: {
      id: user.id
    }
  })
  .then(user => {
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.update Error - post-user-forgot-password');
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
  let token = req.$scope.token;
  let email = req.$params.email;
  let file = templates.forgotPassword;

  let jotToken = lib.jwt.encode({
    email: email
  }, token);

  let values = {
    resetPasswordUrl: `${config.frontEnd.baseUrl}/reset-password/${jotToken}?token=${token}`,
    forgotPasswordUrl: `${config.frontEnd.baseUrl}/forgot-password`
  };

  lib.pug.convert(file, values)
  .then(content => {
    return lib.email.send(`Forgot Password`, email, content);
  })
  .then(pug => {
    next();
    return pug;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'pug.convert Error - post-user-forgot-password');
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
module.exports.findUser = findUser;
module.exports.logic = postUserForgotPassword;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
