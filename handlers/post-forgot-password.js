'use strict';

/**
 * @author Jo-Ries Canino
 * @description User forgot password
 */

const randomstring = require('randomstring');
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
      email: {
        [req.Op.eq]: email
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Email is not registered with us.',
        http_code: 400
      });
    }

    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - post-forgot-password');
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
function updateUser (req, res, next) {
  let user = req.$scope.user;
  let token = randomstring.generate();
  req.$scope.token = token;

  return req.db.user.update({
    passwordResetToken: token,
    tokenActiveDate: moment(new Date()).add(1, 'hour')
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
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.update Error - post-forgot-password');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  /* eslint-disable max-len */
  let token = req.$scope.token;
  let message = 'We heard that you lost your Peersview password. Sorry about that!';
  message += '<p>But don’t worry! You can use the following link within the next day to reset your password:</p>';
  message += '<p>http://localhost:3000/api/reset_password/' + token + '</p>';
  message += '<p>If you don’t use this link within 24 hours, it will expire. To get a new password reset link, visit http://localhost:3000/password_reset</p>';
  message += '<p>Thanks,<br />';
  message += 'Admin at Peersview</p>';

  /**
   * @TODO email send
   */

  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200
  };

  res.status(200)
  .send(body);
}

module.exports.validateParams = validateParams;
module.exports.findUser = findUser;
module.exports.updateUser = updateUser;
module.exports.response = response;
