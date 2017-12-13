'use strict';

const util = require('util');
const assert = require('assert-plus');

// Internal status_codes
const EXTERNAL_FAILURE = 100,
  MISSING_INPUT = 101,
  INVALID_INPUT = 102,
  RESOURCE_EXISTS = 103;

function ValidationError (errors, statusCode) {
  assert.object(errors, 'Must be an array or an object');
  Error.call(this, errors);
  let error = (Array.isArray(errors)) ? errors.shift() : errors;

  this.body = {
    status: 'ERROR'
  };

  this.body.status_message = error.msg;
  if (/Missing/g.test(error.msg)) {
    this.statusCode = this.body.http_code = statusCode || 400;
    this.body.status_code = MISSING_INPUT;
  } else if (/Duplicate/g.test(error.msg)) {
    this.statusCode = this.body.http_code = statusCode || 400;
    this.body.status_code = RESOURCE_EXISTS;
  } else {
    // "Invalid" as default
    this.statusCode = this.body.http_code = statusCode || 400;
    this.body.status_code = INVALID_INPUT;
  }
}
util.inherits(ValidationError, Error);

function InternalError (error) {
  assert.object(error, 'Must be an object');
  Error.call(this, error);

  this.body = {
    status: 'ERROR',
    status_code: EXTERNAL_FAILURE,
    status_message: error.message,
    http_code: this.statusCode = 500
  };
}
util.inherits(InternalError, Error);

module.exports.ValidationError = ValidationError;
module.exports.InternalError = InternalError;
