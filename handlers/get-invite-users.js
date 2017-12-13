'use strict';

/**
 * @author Jo-Ries Canino
 * @description Search user for invites
 */

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
  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  let paramsSchema = {
    query: {
      notEmpty: {
        errorMessage: 'Missing Resource: Query Params'
      }
    }
  };

  req.checkParams(paramsSchema);
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
 * This would be the fallback if the token exist
 * @see {@link lib/isTokenExist}
 * @see isTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function findUser (req, res, next) {
  let query = req.$params.query;
  return req.db.user.findAll({
    where: {
      firstName: {
        [req.Op.like]: `${query}%`
      }
    }
  })
  .then(users => {
    req.$scope.users = users;
    next();
    return users;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findAll Error - get-invite-users');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let users = req.$scope.users;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    users: users
  };

  res.status(200)
  .send(body);
}

module.exports.validateParams = validateParams;
module.exports.findUser = findUser;
module.exports.response = response;
