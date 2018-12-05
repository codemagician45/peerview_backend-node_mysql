/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let listApi = (api) => {
  api.get('/v2/(:communityId/)?list',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.getPostListV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.getPostListV1.logic,
    handlers.post.getPostListV1.response);

  api.get('/v2/community/:courseId/list',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.getPostListV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.getPostListV1.logic,
    handlers.post.getPostListV1.response);
};

module.exports = listApi;
