'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Marketplace
 */

const lib = require('../lib');

/**
 * Validation of req.body, req, param,
 * and req.query in which include 2 validateParams
 * function for getting all the marketplace and
 * one with path params
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function validateParams (req, res, next) {// eslint-disable-line id-length
  let paramsSchema = {
    institutionId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Institution Id'
      }
    }
  };

  if (req.$params.marketplaceId) {
    paramsSchema = {
      marketplaceId: {
        notEmpty: {
          errorMessage: 'Missing Resource: Marketplace Id'
        }
      }
    };
  }

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
 * This would include separate params
 * in which include different param query
 * /marketplace/:institutionId
 * /marketplace/:marketplaceId
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getMarketplace (req, res, next) {
  let institutionId = req.$params.institutionId;
  let marketplaceId = req.$params.marketplaceId;
  let state = 'findOne';
  let query = {
    marketplaceId: {
      [req.Op.eq]: marketplaceId
    }
  };

  /**
   * check if we have institutionId
   * so that we can query to findAll using institutionId or
   * use findOne using marketplaceId
   */
  if (institutionId) {
    state = 'findAll';
    query = {
      institutionId: {
        [req.Op.eq]: institutionId
      }
    };
  }

  return req.db.marketplace[state]({
    where: query
  })
  .then(marketplace => {
    next();
    return marketplace;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, `marketplace.${state} Error - get-marketplace`);
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
module.exports.logic = getMarketplace;
module.exports.response = response;
