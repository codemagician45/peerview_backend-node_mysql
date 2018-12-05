/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let reportApi = (api) => {
  api.post('/v2/community/:postId/report',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostReportV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostReportV1.logic,
    handlers.post.postPostReportV1.response);
};

module.exports = reportApi;
