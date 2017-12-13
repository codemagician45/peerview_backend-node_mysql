'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Registration for Community
 */

const randomstring = require('randomstring');
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
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Name'
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
 * Check if the email is already existed
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function checkIfEmailIsExisted (req, res, next) { // eslint-disable-line id-length
  let email = req.$params.email;
  return req.db.community.findOne({
    where: {
      email: {
        [req.Op.eq]: email
      }
    }
  })
  .then(community => {
    if (community) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 103,
        status_message: 'Email already exists!',
        http_code: 400
      });
    }

    next();
    return community;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'community.findOne Error - post-community');
  });
}

function postCommunity (req, res, next) {
  let name = req.$params.name;
  let email = req.$params.email;
  let password = md5(req.$params.password);
  let token = randomstring.generate();

  return req.db.community.create({
    name: name,
    email: email,
    password: password,
    token: token
  })
  .then(community => {
    next();
    return community;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'community.create Error - post-community');
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
module.exports.checkIfEmailIsExisted = checkIfEmailIsExisted;
module.exports.logic = postCommunity;
module.exports.response = response;
