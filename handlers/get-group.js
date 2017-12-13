'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Groups
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
  let paramsSchema = {
    privacyId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Privacy Id'
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
function getGroup (req, res, next) {
  let userId = req.$scope.user;
  let privacyId = req.$params.privacyId;

  return req.db.group.findAll({
    where: {
      [req.Op.and]: {
        userId: userId,
        privacyId: privacyId
      }
    }
  })
  .then(group => {
    req.$scope.group = group;
    next();
    return group;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'group.findAll Error - get-group');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let group = req.$scope.group;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    group: group
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getGroup;
module.exports.response = response;
