'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Marketplace
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
    marketplaceId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Marketplace Id'
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

/**
 * Get a single item sell in the marketplace
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getCampusMarketplace (req, res, next) {// eslint-disable-line id-length
  let marketplaceId = req.$params.marketplaceId;

  return req.db.campusMarketplace.findOne({
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName']
    }, {
      model: req.db.attachment,
      attributes: ['id', 'cloudinaryPublicId']
    }],
    where: {
      [req.Op.and]: {
        id: marketplaceId
        // isConfirm: true
      }
    }
  })
  .then(campusMarketplace => {
    req.$scope.campusMarketplace = campusMarketplace;
    next();
    return campusMarketplace;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, `campusMarketplace.findOne Error - get-campus-marketplace`);
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
    data: campusMarketplace
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusMarketplace;
module.exports.response = response;
