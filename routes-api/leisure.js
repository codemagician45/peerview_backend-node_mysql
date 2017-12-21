'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function leisureApi (apiRouter) {
  apiRouter.get('/event/dress-codes',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.getEventDressCodes.logic,
    handlers.leisure.getEventDressCodes.response);

  apiRouter.get('/event/event-types',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.getEventTypes.logic,
    handlers.leisure.getEventTypes.response);

  apiRouter.post('/event',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEvent.validateParams,
    lib.upload.events,
    handlers.leisure.postEvent.response);
}

module.exports = leisureApi;
