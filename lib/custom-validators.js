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

module.exports.isArray = isArray;
module.exports.isArrayNotEmpty = isArrayNotEmpty;
