'use strict';

const {
  validationResult,
  checkSchema
} = require('express-validator/check');
const httpCodes = require('./http-codes');
const rpc = require('./rpc');
const config = require('../config');
const log = require('bunyan').createLogger(config.appLog);

const validateParams = (schema) => {
  return checkSchema(schema);
};

/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
const validateResponse = (req, res, next) => {
  let validationErrors = validationResult(req);

  if (validationErrors.array().length !== 0) {
    log.error({
      error: validationErrors.array()
    }, 'lib schema-validator [validateResponse] Error');

    return res.status(httpCodes.BAD_REQUEST)
    .send(new rpc.ValidationError(validationErrors.array()));
  }

  return next();
};

module.exports.validateParams = validateParams;
module.exports.validationResult = validateResponse;
