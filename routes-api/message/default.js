/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let defaultApi = (api) => {
  api.get('/count',
    lib.isTokenExist.user,
    handlers.message.getMessageCount.logic,
    handlers.message.getMessageCount.response);

  api.post('/',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.message.postMessage.querySchema),
    lib.schemaValidator.validationResult,
    handlers.message.postMessage.logic,
    handlers.message.postMessage.response);
};

module.exports = defaultApi;
