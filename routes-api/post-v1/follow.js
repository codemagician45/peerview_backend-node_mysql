/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let followApi = (api) => {
  api.post('/v2/community/:postId/follow',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostFollow.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostFollow.logic,
    handlers.post.postPostFollow.response);
};

module.exports = followApi;
