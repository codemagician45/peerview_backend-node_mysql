/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let ratingApi = (api) => {
  api.post('/v2/community/:postId/rating',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostRatingV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostRatingV1.logic,
    handlers.post.postPostRatingV1.response);
};

module.exports = ratingApi;
