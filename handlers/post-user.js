'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User
 */

const md5 = require('MD5');
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
    if (user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Email already exists',
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
    }, 'user.findOne Error - post-user');
  });
}

function postUser (req, res, next) {
  let firstName = req.$params.userName;
  let lastName = req.$params.lastName;
  let email = req.$params.email;
  let password = md5(req.$params.password);

  return req.db.user.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
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
    }, 'user.create Error - post-user');
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
    http_code: 201
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.findUser = findUser;
module.exports.logic = postUser;
module.exports.response = response;
