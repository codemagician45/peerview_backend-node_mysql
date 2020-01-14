'use strict';

const httpCodes = require('./http-codes');
const internalStatusCodes = require('./internal-status-codes');

/**
 * @class Reponse proto
 */
function Response () {}

Response.createOk = (data) => {
  let response = {
    status: 'SUCCESS',
    statusCode: internalStatusCodes.SUCCESS,
    httpCode: httpCodes.OK,
    data: data
  };

  return response;
};

Response.created = (data) => {
  let response = {
    status: 'SUCCESS',
    statusCode: internalStatusCodes.SUCCESS,
    httpCode: httpCodes.CREATED,
    data: data
  };

  return response;
};

module.exports = Response;
