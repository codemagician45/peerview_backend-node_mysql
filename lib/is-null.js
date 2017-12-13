'use strict';

/**
 * This will act as a middleware for
 * checking if a varible declaration or param
 * is null, undefined or empty
 * @author Jo-Ries Canino
 */

function isNull (value) {
  return (
    value === undefined
    || value === 'undefined'
    || value === null
    || value === '');
}

module.exports = isNull;
