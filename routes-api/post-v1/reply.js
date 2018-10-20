/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let chart = (api) => {
  api.get('/:postId/reply',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostReply.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostReply.logic,
    lib.userCredits.updateUserCredits,
    lib.notification.createPostReplyNotification,
    handlers.post.postPostReply.response);
};

module.exports = chart;
