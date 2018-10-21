/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let listApi = (api) => {
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
};

module.exports = listApi;
