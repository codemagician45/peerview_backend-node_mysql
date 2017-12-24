'use strict';/*eslint-disable max-statements*/

const handlers = require('../handlers');
const lib = require('../lib');

function campusApi (apiRouter) {
  apiRouter.get('/campus/:campusId/freshers-feed',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusFreshersFeed.validateParams,
    handlers.campus.getCampusFreshersFeed.logic,
    handlers.campus.getCampusFreshersFeed.response);

  apiRouter.post('/campus/user/course/classes', // adding of classes of a user
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusUserCourseClasses.validateParams,
    handlers.campus.postCampusUserCourseClasses.logic,
    handlers.campus.postCampusUserCourseClasses.response);

  apiRouter.post('/campus/:campusId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/:campusId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPoll.validateParams,
    handlers.campus.postCampusPostPoll.logic,
    handlers.campus.postCampusPostPoll.saveCampusPostPollOption,
    handlers.campus.postCampusPostPoll.response);

  apiRouter.post('/campus/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostLike.validateParams,
    handlers.campus.postCampusPostLike.logic,
    handlers.campus.postCampusPostLike.response);

  apiRouter.post('/campus/post/:postId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPageview.validateParams,
    handlers.campus.postCampusPostPageview.logic,
    handlers.campus.postCampusPostPageview.response);

  apiRouter.post('/campus/post/:postId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostRating.validateParams,
    handlers.campus.postCampusPostRating.logic,
    handlers.campus.postCampusPostRating.response);

  apiRouter.post('/campus/post/:postId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReply.validateParams,
    handlers.campus.postCampusPostReply.logic,
    handlers.campus.postCampusPostReply.response);

  apiRouter.post('/campus/post/:postId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReport.validateParams,
    handlers.campus.postCampusPostReport.logic,
    handlers.campus.postCampusPostReport.response);

  // course feed
  apiRouter.post('/campus/:campusId/course/:courseId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/:campusId/course/:courseId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPoll.validateParams,
    handlers.campus.postCampusPostPoll.logic,
    handlers.campus.postCampusPostPoll.saveCampusPostPollOption,
    handlers.campus.postCampusPostPoll.response);

  apiRouter.post('/campus/course/post/:postId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReply.validateParams,
    handlers.campus.postCampusPostReply.logic,
    handlers.campus.postCampusPostReply.response);

  apiRouter.post('/campus/course/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostLike.validateParams,
    handlers.campus.postCampusPostLike.logic,
    handlers.campus.postCampusPostLike.response);

  apiRouter.post('/campus/course/post/:postId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPageview.validateParams,
    handlers.campus.postCampusPostPageview.logic,
    handlers.campus.postCampusPostPageview.response);

  apiRouter.post('/campus/course/post/:postId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostRating.validateParams,
    handlers.campus.postCampusPostRating.logic,
    handlers.campus.postCampusPostRating.response);

  apiRouter.post('/campus/course/post/:postId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReport.validateParams,
    handlers.campus.postCampusPostReport.logic,
    handlers.campus.postCampusPostReport.response);

  // freshers feed
  apiRouter.post('/campus/:campusId/freshers-feed/:freshersFeedId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/:campusId/freshers-feed/:freshersFeedId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPoll.validateParams,
    handlers.campus.postCampusPostPoll.logic,
    handlers.campus.postCampusPostPoll.saveCampusPostPollOption,
    handlers.campus.postCampusPostPoll.response);

  apiRouter.post('/campus/freshers-feed/post/:postId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReply.validateParams,
    handlers.campus.postCampusPostReply.logic,
    handlers.campus.postCampusPostReply.response);

  apiRouter.post('/campus/freshers-feed/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostLike.validateParams,
    handlers.campus.postCampusPostLike.logic,
    handlers.campus.postCampusPostLike.response);

  apiRouter.post('/campus/freshers-feed/post/:postId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPageview.validateParams,
    handlers.campus.postCampusPostPageview.logic,
    handlers.campus.postCampusPostPageview.response);

  apiRouter.post('/campus/freshers-feed/post/:postId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostRating.validateParams,
    handlers.campus.postCampusPostRating.logic,
    handlers.campus.postCampusPostRating.response);

  apiRouter.post('/campus/freshers-feed/post/:postId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReport.validateParams,
    handlers.campus.postCampusPostReport.logic,
    handlers.campus.postCampusPostReport.response);

  // class feed
  apiRouter.post('/campus/:campusId/course/class/:classId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/:campusId/course/class/:classId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPoll.validateParams,
    handlers.campus.postCampusPostPoll.logic,
    handlers.campus.postCampusPostPoll.saveCampusPostPollOption,
    handlers.campus.postCampusPostPoll.response);

  apiRouter.post('/campus/:campusId/course/class/:classId/post/brainstorming',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/course/class/post/:postId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReply.validateParams,
    handlers.campus.postCampusPostReply.logic,
    handlers.campus.postCampusPostReply.response);

  apiRouter.post('/campus/course/class/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostLike.validateParams,
    handlers.campus.postCampusPostLike.logic,
    handlers.campus.postCampusPostLike.response);

  apiRouter.post('/campus/course/class/post/:postId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPageview.validateParams,
    handlers.campus.postCampusPostPageview.logic,
    handlers.campus.postCampusPostPageview.response);

  apiRouter.post('/campus/course/class/post/:postId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostRating.validateParams,
    handlers.campus.postCampusPostRating.logic,
    handlers.campus.postCampusPostRating.response);

  apiRouter.post('/campus/course/class/post/:postId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReport.validateParams,
    handlers.campus.postCampusPostReport.logic,
    handlers.campus.postCampusPostReport.response);

  apiRouter.get('/campus/jobs',
    lib.params,
    handlers.campus.getCampusJobs.logic,
    handlers.campus.getCampusJobs.response);

  apiRouter.get('/campus/job/:jobId',
    lib.params,
    handlers.campus.getCampusJob.validateParams,
    handlers.campus.getCampusJob.logic,
    handlers.campus.getCampusJob.response);

  apiRouter.put('/campus/job/:jobId',
    lib.params,
    handlers.campus.updateCampusJob.validateParams,
    handlers.campus.updateCampusJob.logic,
    handlers.campus.updateCampusJob.response);

  apiRouter.get('/campus/:campusId/marketplace',
    lib.params,
    handlers.campus.getCampusMarketplaceByCampusId.validateParams,
    lib.isTokenExist.user,
    handlers.campus.getCampusMarketplaceByCampusId.logic,
    handlers.campus.getCampusMarketplaceByCampusId.response);

  apiRouter.get('/campus/marketplace/:marketplaceId',
    lib.params,
    handlers.campus.getCampusMarketplaceByMarketplaceId.validateParams,
    lib.isTokenExist.user,
    handlers.campus.getCampusMarketplaceByMarketplaceId.logic,
    handlers.campus.getCampusMarketplaceByMarketplaceId.response);

  apiRouter.post('/campus/marketplace',
    lib.params,
    handlers.campus.postCampusMarketplace.validateParams,
    lib.isTokenExist.user,
    lib.upload.multiple,
    handlers.campus.postCampusMarketplace.logic,
    handlers.campus.postCampusMarketplace.saveCampusMarketplacePhotos,
    handlers.campus.postCampusMarketplace.response);

  apiRouter.delete('/marketplace/:marketplaceId',
    lib.params,
    handlers.campus.removeCampusMarketplace.validateParams,
    lib.isTokenExist.user,
    handlers.campus.removeCampusMarketplace.logic,
    handlers.campus.removeCampusMarketplace.response);
}

module.exports = campusApi;
