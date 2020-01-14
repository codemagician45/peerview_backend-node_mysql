/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let listApi = (api) => {
  api.get('/list',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.notification.getNotificationList.querySchema),
    lib.schemaValidator.validationResult,
    handlers.notification.getNotificationList.logic,
    handlers.notification.getNotificationList.response);
};

module.exports = listApi;
