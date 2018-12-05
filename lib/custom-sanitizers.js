'use strict';

const validator = require('validator');

/*eslint-disable no-unused-vars*/
const sanitizeToNullIfUndefined = (value, {
  req,
  location,
  path
}) => {
  if (value !== 'undefined') {
    return value;
  }

  req.$params[path] = null;
  req.params[path] = null;
  return req.$params[path];
};

module.exports.sanitizeToNullIfUndefined = sanitizeToNullIfUndefined;
