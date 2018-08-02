'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Cities in a given country
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
    countryCode: {
      isISO31661Alpha2: {
        errorMessage: 'Invalid resource: Country Code'
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

function getCities (req, res, next) {
  let countryCode = req.$params.countryCode;
  return req.db.city.findAll({
    attributes: ['id', 'name'],
    where: {
      countryCode: {
        [req.Op.eq]: countryCode.toUpperCase()
      }
    }
  })
  .then(cities => {
    req.$scope.cities = cities;
    next();
    return cities;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'city.findAll Error - get-cities');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let cities = req.$scope.cities;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: cities
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCities;
module.exports.response = response;
