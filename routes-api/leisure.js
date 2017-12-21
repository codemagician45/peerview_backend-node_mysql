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

  apiRouter.get('/event/my-events',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.getEventMyEvents.validateParams,
    handlers.leisure.getEventMyEvents.logic,
    handlers.leisure.getEventMyEvents.response);

  /**
   * This one is a special case in which the upload.events
   * precedes the lib.params
   * This is because the content-type: multipart/form-data
   * In which body parser don't handle that kind of content-type.
   * That is we are using upload.events as a mediator and as well
   * to use the capability of the multer to assemble our
   * req.body and merge them in lib.params
   */
  apiRouter.post('/event',
    lib.isTokenExist.user,
    lib.upload.events,
    lib.params,
    handlers.leisure.postEvent.validateParams,
    handlers.leisure.postEvent.logic,
    handlers.leisure.postEvent.saveImages,
    handlers.leisure.postEvent.savePosters,
    handlers.leisure.postEvent.saveVideos,
    handlers.leisure.postEvent.response);
}

module.exports = leisureApi;
