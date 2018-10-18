/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let chart = (api) => {
  api.get('/list/:parentId',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.message.getMessageListByParentId.querySchema),
    lib.schemaValidator.validationResult,
    handlers.message.getMessageListByParentId.logic,
    handlers.message.getMessageListByParentId.response);

  api.get('/list',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.message.getMessageList.querySchema),
    lib.schemaValidator.validationResult,
    handlers.message.getMessageList.logic,
    handlers.message.getMessageList.response);

  api.post('/',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.message.postMessage.querySchema),
    lib.schemaValidator.validationResult,
    handlers.message.postMessage.logic,
    handlers.message.postMessage.response);
};

module.exports = chart;
