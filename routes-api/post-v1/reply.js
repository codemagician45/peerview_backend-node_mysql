/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let replyApi = (api) => {
  api.post('/v2/:postId/reply',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostReplyV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostReplyV1.logic,
    lib.userCredits.updateUserCredits,
    lib.notification.createPostReplyNotification,
    handlers.post.postPostReplyV1.response);
};

module.exports = replyApi;
