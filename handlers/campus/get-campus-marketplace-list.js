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
    },
    offset: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Offset'
      }
    },
    limit: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Limit'
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
 * Get all the items sell in the marketplace
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getCampusMarketplaceList (req, res, next) {// eslint-disable-line id-length
  let campusId = req.$params.campusId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;

  return req.db.campusMarketplace.findAll({
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName']
    }, {
      model: req.db.attachment,
      attributes: ['id', 'cloudinaryPublicId']
    }],
    where: {
      [req.Op.and]: {
        campusId: campusId,
        isConfirm: false//true
      }
    },
    order: [['createdAt', 'DESC']],
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
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
    }, `campusMarketplace.findAll Error - get-campus-marketplace-list`);
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
module.exports.logic = getCampusMarketplaceList;
module.exports.response = response;
