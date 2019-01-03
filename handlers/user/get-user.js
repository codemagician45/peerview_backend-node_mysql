'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User
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
  let paramsSchema = {
    userId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Id'
      }
    }
  };

  req.checkParams(paramsSchema);
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

function getUser (req, res, next) {
  let userId = req.$params.userId;

  return req.db.user.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture', 'socialImage'],
    where: {
      id: {
        [req.Op.eq]: userId
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
      err: error.message
    }, 'user.findAll Error - get-user');
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
    data: user
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getUser;
module.exports.response = response;
