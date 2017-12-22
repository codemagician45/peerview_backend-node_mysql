'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function leisureApi (apiRouter) {
  apiRouter.get('/events',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.getEvents.validateParams,
    handlers.leisure.getEvents.logic,
    handlers.leisure.getEvents.response);

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
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEvent.validateParams,
    handlers.leisure.postEvent.logic,
    handlers.leisure.postEvent.saveAttachments,
    handlers.leisure.postEvent.response);

  apiRouter.post('/event/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPost.validateParams,
    handlers.leisure.postEventPost.logic,
    handlers.leisure.postEventPost.saveAttachments,
    handlers.leisure.postEventPost.response);

  apiRouter.post('/event/post/:eventPostId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPostLike.validateParams,
    handlers.leisure.postEventPostLike.logic,
    handlers.leisure.postEventPostLike.response);

  apiRouter.post('/event/post/:eventPostId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPostPageview.validateParams,
    handlers.leisure.postEventPostPageview.logic,
    handlers.leisure.postEventPostPageview.response);

  apiRouter.post('/event/post/:eventPostId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPostRating.validateParams,
    handlers.leisure.postEventPostRating.logic,
    handlers.leisure.postEventPostRating.response);

  apiRouter.post('/event/post/:eventPostId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPostReply.validateParams,
    handlers.leisure.postEventPostReply.logic,
    handlers.leisure.postEventPostReply.response);

  apiRouter.post('/event/post/:eventPostId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPostReport.validateParams,
    handlers.leisure.postEventPostReport.logic,
    handlers.leisure.postEventPostReport.response);
}

module.exports = leisureApi;
