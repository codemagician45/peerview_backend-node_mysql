'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Society Club
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
    institutionId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Institution Id'
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
function getSocietyClub (req, res, next) {
  let userId = req.$scope.user;
  let institutionId = req.$params.institutionId;

  return req.db.societyClub.findAll({
    where: {
      [req.Op.and]: {
        userId: userId,
        institutionId: institutionId
      }
    }
  })
  .then(societyClub => {
    req.$scope.societyClub = societyClub;
    next();
    return societyClub;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'societyClub.findAll Error - get-society-club');
  });
}

/**
 * This would be the fallback if the user
 * has a valid token in which available in the
 * route GET /api/society-club/all/:societyClubId
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getAllSocietyClub (req, res, next) {
  let institutionId = req.$params.institutionId;

  return req.db.societyClub.findAll({
    where: {
      institutionId: {
        [req.Op.and]: institutionId
      }
    }
  })
  .then(societyClub => {
    req.$scope.societyClub = societyClub;
    next();
    return societyClub;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'societyClub.findAll Error - get-society-club');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let societyClub = req.$scope.societyClub;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    societyClub: societyClub
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getSocietyClub;
module.exports.getAllSocietyClub = getAllSocietyClub;
module.exports.response = response;
