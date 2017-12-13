'use strict';

function isArray (value) {
  return Array.isArray(value);
}

function isArrayNotEmpty (value) {
  if (Array.isArray(value) || value.length === 0) {
    return true;
  }

  return false;
}

module.exports.isArray = isArray;
module.exports.isArrayNotEmpty = isArrayNotEmpty;
