'use strict';

const url = require('url');

/**
 * This will be used as a merge params
 * of the req.query, req.body, and req.params
 * from the request object.
 */
function params (req, res, next) {
  let query = url.parse(req.url, true).query;
  req.$params = Object.assign(req.params, req.body, query);

  next();
}

module.exports = params;
