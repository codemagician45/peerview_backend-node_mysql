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
    currentPassword: {
      notEmpty: {
        errorMessage: 'Missing Resource: Current Password'
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
    },
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
 * This would be the fallback if the password
 * and confirm_password are the same
 * Then check the current_password if it is
 * the same as the pass parameter
 * @see {@link validatePasswordAndConfirmPassword}
 * @see validatePasswordAndConfirmPassword
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function checkCommunityCurrentPassword (req, res, next) {// eslint-disable-line id-length
  let token = req.headers.token;
  let password = md5(req.$params.currentPassword);
  return req.db.community.findOne({
    where: {
      [req.Op.and]: {
        token: token,
        password: password
      }
    }
  })
  .then(community => {
    if (!community) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Invalid Current Password',
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
    }, 'community.findOne Error - update-community-new-password');
  });
}

/**
 * This would be the fallback if the token exist
 * @see {@link lib/isCommunityTokenExist}
 * @see isCommunityTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateCommunityNewPassword (req, res, next) {// eslint-disable-line id-length
  let community = req.$scope.community;
  let password = md5(req.$params.password);
  return req.db.community.update({
    password: password
  }, {
    where: {
      id: {
        [req.Op.eq]: community.id
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
    }, 'community.update Error - update-community-new-password');
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
module.exports.checkCommunityCurrentPassword = checkCommunityCurrentPassword;
module.exports.logic = updateCommunityNewPassword;
module.exports.response = response;
