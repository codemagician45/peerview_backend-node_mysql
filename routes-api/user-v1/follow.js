/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let searchApi = (api) => {
  api.post('/:userId/follow',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.user.postUserFollow.querySchema),
    lib.schemaValidator.validationResult,
    handlers.user.postUserFollow.logic,
    handlers.user.postUserFollow.sendEmail,
    lib.userCredits.updateUserCredits,
    lib.notification.newFollowerNotification,
    handlers.user.postUserFollow.response);
};

module.exports = searchApi;
