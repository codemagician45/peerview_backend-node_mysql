'use strict';

const validator = require('validator');

function isArray (value) {
  return Array.isArray(value);
}

function isArrayNotEmpty (value) {
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  return true;
}

function isISO31661Alpha2 (value) {
  if (typeof value === 'undefined') {return false;}
  return validator.isISO31661Alpha2(value);
}

function isISO8601 (value) { // date standard validation
  if (typeof value === 'undefined') {return false;}
  return validator.isISO8601(value);
}

function isJSON (value) {
  return typeof value === 'object';
}

module.exports.isArray = isArray;
module.exports.isArrayNotEmpty = isArrayNotEmpty;
module.exports.isISO31661Alpha2 = isISO31661Alpha2;
module.exports.isISO8601 = isISO8601;
module.exports.isJSON = isJSON;
