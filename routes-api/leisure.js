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

  apiRouter.get('/event/:eventId',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.getEvent.validateParams,
    handlers.leisure.getEvent.logic,
    handlers.leisure.getEvent.response);

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

  apiRouter.post('/event',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEvent.validateParams,
    handlers.leisure.postEvent.logic,
    handlers.leisure.postEvent.saveAttachments,
    handlers.leisure.postEvent.response);

  apiRouter.post('/event/:eventId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPost.validateParams,
    handlers.leisure.postEventPost.logic,
    handlers.leisure.postEventPost.saveAttachments,
    handlers.leisure.postEventPost.response);

  apiRouter.post('/event/:eventId/guest-list',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventGuestList.validateParams,
    handlers.leisure.postEventGuestList.logic,
    handlers.leisure.postEventGuestList.response);

  apiRouter.post('/event/:eventId/vip',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventVip.validateParams,
    handlers.leisure.postEventVip.logic,
    handlers.leisure.postEventVip.response);

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

  apiRouter.post('/event/:eventId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.leisure.postEventPostPoll.validateParams,
    handlers.leisure.postEventPostPoll.logic,
    handlers.leisure.postEventPostPoll.saveEventPollOption,
    handlers.leisure.postEventPostPoll.response);
}

module.exports = leisureApi;
