/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let defaultApi = (api) => {
  api.get('/count',
    lib.isTokenExist.user,
    handlers.notification.getNotificationCount.logic,
    handlers.notification.getNotificationCount.response);

  api.put('/:notificationId',
    lib.params,
    lib.isTokenExist.user,
    handlers.notification.updateOneNotificationStatus.validateParams,
    handlers.notification.updateOneNotificationStatus.logic,
    handlers.notification.updateOneNotificationStatus.response);

  api.put('/update/:subjectId',
    lib.params,
    lib.isTokenExist.user,
    handlers.notification.updateAllNotification.validateParams,
    handlers.notification.updateAllNotification.logic,
    handlers.notification.updateAllNotification.response);
};

module.exports = defaultApi;
