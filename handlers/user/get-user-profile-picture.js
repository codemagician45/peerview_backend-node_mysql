'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update User Profile Picture
 */

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
  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

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
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getUserProfilePicture (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;

  return req.db.user.findOne({
    attributes: ['profilePicture'],
    where: {
      id: {
        [req.Op.eq]: user.id
      }
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
      err: error
    }, 'user.findOne Error - get-user-profile-picture');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let user = req.$scope.user;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    user: user
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getUserProfilePicture;
module.exports.response = response;
