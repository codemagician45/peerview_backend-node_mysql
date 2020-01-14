/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let searchApi = (api) => {
  api.get('/search/via-tag',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.user.getUserSearchViaTag.querySchema),
    lib.schemaValidator.validationResult,
    handlers.user.getUserSearchViaTag.logic,
    handlers.user.getUserSearchViaTag.response);
};

module.exports = searchApi;
