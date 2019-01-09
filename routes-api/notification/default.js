/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let defaultApi = (api) => {
  api.get('/count',
    lib.isTokenExist.user,
    handlers.notification.getNotificationCount.logic,
    handlers.notification.getNotificationCount.response);
};

module.exports = defaultApi;
