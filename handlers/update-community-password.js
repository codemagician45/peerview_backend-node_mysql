'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update Community Password
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

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkBody(bodySchema);
  req.checkHeaders(headerSchema);
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
 * Update community password
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateCommunityPassword (req, res, next) {// eslint-disable-line id-length
  let password = md5(req.$params.password);
  let token = req.headers.token;
  return req.db.community.update({
    password: password,
    changePassword: 0
  }, {
    where: {
      token: {
        [req.Op.eq]: token
      }
    }
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
    }, 'community.update Error - update-community-password');
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
module.exports.logic = updateCommunityPassword;
module.exports.response = response;
