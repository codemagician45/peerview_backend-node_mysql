'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function leisureApi (apiRouter) {
  apiRouter.post('/event',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEvent.validateParams,
    lib.upload.events,
    handlers.leisure.postEvent.response);
}

module.exports = leisureApi;
