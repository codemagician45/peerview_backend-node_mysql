/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let likeApi = (api) => {
  api.post('/v2/community/:postId/like',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostLikeV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostLikeV1.logic,
    handlers.post.postPostLikeV1.response);
};

module.exports = likeApi;
