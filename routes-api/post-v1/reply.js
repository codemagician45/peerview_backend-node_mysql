/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let replyApi = (api) => {
  api.post('/v2/community/:postId/reply',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostReplyV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.getPostV1.logic,
    handlers.post.postPostReplyV1.logic,
    lib.userCredits.updateUserCredits,
    lib.notification.communityPostReplyNotification,
    handlers.post.postPostReplyV1.response);

  api.post('/v2/community/reply/:replyId/like',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostReplyLike.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostReplyLike.logic,
    handlers.post.postPostReplyLike.response);

  api.delete('/v2/community/reply/:replyId',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.removePostReply.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.removePostReply.logic,
    handlers.post.removePostReply.response);
};

module.exports = replyApi;
