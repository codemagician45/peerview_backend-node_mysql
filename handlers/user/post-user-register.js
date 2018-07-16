'use strict';

/**
 * @author Jo-Ries Canino
 * @description User Registration
 */

const randomstring = require('randomstring');
const md5 = require('MD5');
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
    firstName: {
      notEmpty: {
        errorMessage: 'Missing Resource: First Name'
      }
    },
    lastName: {
      notEmpty: {
        errorMessage: 'Missing Resource: Last Name'
      }
    },
    email: {
      notEmpty: {
        errorMessage: 'Missing Resource: Email'
      },
      isEmail: {
        errorMessage: 'Invalid Resource: Email'
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
 * This will test if our password and confirmPassword
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

/**
 * This would be the fallback if password
 * and confirm_password are the same
 * Then check if the email is already existed
 * @see {@link validatePasswordAndConfirmPassword}
 * @see validatePasswordAndConfirmPassword
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function checkifEmailIsExisted (req, res, next) {// eslint-disable-line id-length
  let email = req.$params.email;
  return req.db.user.findOne({
    where: {
      email: {
        [req.Op.eq]: email
      }
    }
  })
  .then(user => {
    if (user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 103,
        status_message: 'Email Already Exist',
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
      err: error.message
    }, 'user.findOne Error - post-user-register');
  });
}

/**
 * Create newly registered user
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postUserRegister (req, res, next) {
  let firstName = req.$params.firstName;
  let lastName = req.$params.lastName;
  let email = req.$params.email;
  let password = md5(req.$params.password);
  let token = randomstring.generate();

  let create = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
    // token: token
    // dont save the token so that we don't have a token for user verification yet
    // until the user verify its email
  };

  return req.db.user.create(create)
  .then(user => {
    req.$scope.user = user;
    req.$scope.token = token;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.create Error');
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
  let token = req.$scope.token;
  let email = req.$params.email;
  let name = `${req.$params.firstName}`;
  let file = templates.emailVerification;

  let jotToken = lib.jwt.encode({
    userId: user.id
  }, token);

  let values = {
    name: name,
    verifyEmailUrl: `${config.frontEnd.baseUrl}/user/verify-email?jotToken=${jotToken}&token=${token}`
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
module.exports.validatePasswordAndConfirmPassword = validatePasswordAndConfirmPassword;
module.exports.checkifEmailIsExisted = checkifEmailIsExisted;
module.exports.logic = postUserRegister;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
