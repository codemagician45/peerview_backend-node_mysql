'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Marketplace by Campus Id
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
function validateParams (req, res, next) {// eslint-disable-line id-length
  let paramsSchema = {
    campusId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Campus Id'
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
 * Get all the items sell in the marketplace
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getCampusMarketplaceByCampusId (req, res, next) {// eslint-disable-line id-length
  let campusId = req.$params.campusId;

  return req.db.campusMarketplace.findAll({
    where: {
      campusId: {
        [req.Op.eq]: campusId
      }
    }
  })
  .then(campusMarketplace => {
    next();
    return campusMarketplace;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, `campusMarketplace.findAll Error - get-campus-marketplace-by-campus-id`);
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusMarketplace = req.$scope.campusMarketplace;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    campusMarketplace: campusMarketplace
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusMarketplaceByCampusId;
module.exports.response = response;
