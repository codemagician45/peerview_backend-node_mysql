/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let followApi = (api) => {
  api.post('/v2/community/:courseId/:postId/follow',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostFollow.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.getPostV1.logic,
    handlers.post.postPostFollow.logic,
    lib.notification.postCommunityPostFollow,
    handlers.post.postPostFollow.response);

  api.delete('/v2/community/:courseId/:postId/follow',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.removePostFollow.validateParams,
    handlers.post.removePostFollow.logic,
    handlers.post.removePostFollow.response);
};

module.exports = followApi;
