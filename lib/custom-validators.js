'use strict';

const validator = require('validator');

function isArray (value) {
  if (typeof value === 'undefined') {return false;}
  let isJson = validator.isJSON(value);
  if (!isJson) {return false;}

  value = JSON.parse(value);
  return Array.isArray(value);
}

function isArrayNotEmpty (value) {
  if (typeof value === 'undefined') {return false;}
  let isJson = validator.isJSON(value);
  if (!isJson) {return false;}

  value = JSON.parse(value);
  if (Array.isArray(value) || value.length === 0) {
    return true;
  }

  return false;
}

function isISO31661Alpha2 (value) {
  if (typeof value === 'undefined') {return false;}
  return validator.isISO31661Alpha2(value);
}

function isISO8601 (value) { // date standard validation
  if (typeof value === 'undefined') {return false;}
  return validator.isISO8601(value);
}

module.exports.isArray = isArray;
module.exports.isArrayNotEmpty = isArrayNotEmpty;
module.exports.isISO31661Alpha2 = isISO31661Alpha2;
module.exports.isISO8601 = isISO8601;
