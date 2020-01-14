'use strict';

const util = require('util');
const assert = require('assert-plus');
const httpCodes = require('./http-codes');
const internalStatusCodes = require('./internal-status-codes');

/**
 * @param {object} errors - list of errors
 * @param {number} statusCode - http code
 */
function ValidationError (errors, statusCode) {
  assert.object(errors, 'Must be an array or an object');
  Error.call(this, errors);
  let error = (Array.isArray(errors)) ? errors.shift() : errors;

  this.status = 'ERROR';
  this.statusMessage = error.msg;
  if (/Missing/g.test(error.msg)) {
    this.httpCode = statusCode || httpCodes.BAD_REQUEST;
    this.statusCode = internalStatusCodes.MISSING_INPUT;
  } else if (/Duplicate/g.test(error.msg)) {
    this.httpCode = statusCode || httpCodes.BAD_REQUEST;
    this.statusCode = internalStatusCodes.RESOURCE_EXISTS;
  } else {
    // "Invalid" as default
    this.httpCode = statusCode || httpCodes.BAD_REQUEST;
    this.statusCode = internalStatusCodes.INVALID_INPUT;
  }
}
util.inherits(ValidationError, Error);

/**
 * @param {object} error - error stacktrace
 * @param {number} statusCode - http code of the error default to 500
 */
function InternalError (error, statusCode) {
  assert.object(error, 'Must be an object');
  Error.call(this, error);

  this.status = 'ERROR';
  this.statusCode = internalStatusCodes.EXTERNAL_FAILURE;
  this.statusMessage = error.message;
  this.httpCode = statusCode || httpCodes.SERVER_ERROR;
}

util.inherits(InternalError, Error);

module.exports.ValidationError = ValidationError;
module.exports.InternalError = InternalError;
