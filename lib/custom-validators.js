'use strict';

function isArray (value) {
  value = JSON.parse(value);
  return Array.isArray(value);
}

function isArrayNotEmpty (value) {
  value = JSON.parse(value);
  if (Array.isArray(value) || value.length === 0) {
    return true;
  }

  return false;
}

module.exports.isArray = isArray;
module.exports.isArrayNotEmpty = isArrayNotEmpty;
