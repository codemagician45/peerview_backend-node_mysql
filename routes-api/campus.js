/*eslint-disable max-statements,max-lines*/
'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function campusApi (apiRouter) {
  apiRouter.get('/campus/:campusId/freshers-feed',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusFreshersFeed.validateParams,
    handlers.campus.getCampusFreshersFeed.logic,
    handlers.campus.getCampusFreshersFeed.response);

  apiRouter.get('/campus/:campusId/user/course/classes',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusUserCourseClasses.validateParams,
    handlers.campus.getCampusUserCourseClasses.logic,
    handlers.campus.getCampusUserCourseClasses.response);

  apiRouter.get('/campus/:campusId/posts', // the the list of post in all students
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPosts.validateParams,
    handlers.campus.getCampusPosts.logic,
    handlers.campus.getCampusPosts.response);

  apiRouter.get('/campus/:campusId/course/:courseId/posts', // the the list of post in course feed
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPosts.validateParams,
    handlers.campus.getCampusPosts.logic,
    handlers.campus.getCampusPosts.response);

  apiRouter.get('/campus/:campusId/course/class/:classId/posts', // the the list of post in course class feed
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPosts.validateParams,
    handlers.campus.getCampusPosts.logic,
    handlers.campus.getCampusPosts.response);

  apiRouter.get('/campus/:campusId/freshers-feed/:freshersFeedId/posts', // the the list of post in freshers-feed
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPosts.validateParams,
    handlers.campus.getCampusPosts.logic,
    handlers.campus.getCampusPosts.response);

  apiRouter.get('/campus/:campusId/society-club/:clubId/posts', // the the list of post in society club
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPosts.validateParams,
    handlers.campus.getCampusPosts.logic,
    handlers.campus.getCampusPosts.response);

  apiRouter.get('/campus/:campusId/student-group/:groupId/posts', // the the list of post in student group
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPosts.validateParams,
    handlers.campus.getCampusPosts.logic,
    handlers.campus.getCampusPosts.response);

  apiRouter.get('/campus/post/:postId', // get a post to all students
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPost.validateParams,
    handlers.campus.getCampusPost.logic,
    handlers.campus.getCampusPost.response);

  apiRouter.get('/campus/course/post/:postId', // get a post to course feed
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPost.validateParams,
    handlers.campus.getCampusPost.logic,
    handlers.campus.getCampusPost.response);

  apiRouter.get('/campus/course/class/post/:postId', // get a post to course class feed
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPost.validateParams,
    handlers.campus.getCampusPost.logic,
    handlers.campus.getCampusPost.response);

  apiRouter.get('/campus/freshers-feed/post/:postId', // get a post to freshers-feed
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPost.validateParams,
    handlers.campus.getCampusPost.logic,
    handlers.campus.getCampusPost.response);

  apiRouter.get('/campus/society-club/post/:postId', // get a post to a certain society-club
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPost.validateParams,
    handlers.campus.getCampusPost.logic,
    handlers.campus.getCampusPost.response);

  apiRouter.get('/campus/student-group/post/:postId', // get a post to a certain student group
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusPost.validateParams,
    handlers.campus.getCampusPost.logic,
    handlers.campus.getCampusPost.response);

  apiRouter.get('/campus/:campusId/society-clubs', // get all created society clubs
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusSocietyClubs.validateParams,
    handlers.campus.getCampusSocietyClubs.logic,
    handlers.campus.getCampusSocietyClubs.response);

  apiRouter.get('/campus/:campusId/student-groups', // get all created student groups
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.getCampusStudentGroups.validateParams,
    handlers.campus.getCampusStudentGroups.logic,
    handlers.campus.getCampusStudentGroups.response);

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
    handlers.campus.postCampusPost.saveCampusPostPollOption, // use in poll option saving
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

  //society and club
  apiRouter.post('/campus/:campusId/society-club', // creation of a society and club
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusSocietyClub.validateParams,
    handlers.campus.postCampusSocietyClub.logic,
    handlers.campus.postCampusSocietyClub.response);

  apiRouter.post('/campus/:campusId/society-club/:clubId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/:campusId/society-club/:clubId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPoll.validateParams,
    handlers.campus.postCampusPostPoll.logic,
    handlers.campus.postCampusPostPoll.saveCampusPostPollOption,
    handlers.campus.postCampusPostPoll.response);

  apiRouter.post('/campus/society-club/post/:postId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReply.validateParams,
    handlers.campus.postCampusPostReply.logic,
    handlers.campus.postCampusPostReply.response);

  apiRouter.post('/campus/society-club/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostLike.validateParams,
    handlers.campus.postCampusPostLike.logic,
    handlers.campus.postCampusPostLike.response);

  apiRouter.post('/campus/society-club/post/:postId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPageview.validateParams,
    handlers.campus.postCampusPostPageview.logic,
    handlers.campus.postCampusPostPageview.response);

  apiRouter.post('/campus/society-club/post/:postId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostRating.validateParams,
    handlers.campus.postCampusPostRating.logic,
    handlers.campus.postCampusPostRating.response);

  apiRouter.post('/campus/society-club/post/:postId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReport.validateParams,
    handlers.campus.postCampusPostReport.logic,
    handlers.campus.postCampusPostReport.response);

  // student group
  apiRouter.post('/campus/:campusId/student-group', // creation of student group
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusStudentGroup.validateParams,
    handlers.campus.postCampusStudentGroup.logic,
    handlers.campus.postCampusStudentGroup.addUserToStudentGroup,
    handlers.campus.postCampusStudentGroup.response);

  apiRouter.post('/campus/:campusId/student-group/:groupId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/:campusId/student-group/:groupId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPoll.validateParams,
    handlers.campus.postCampusPostPoll.logic,
    handlers.campus.postCampusPostPoll.saveCampusPostPollOption,
    handlers.campus.postCampusPostPoll.response);

  apiRouter.post('/campus/:campusId/student-group/:groupId/post/brainstorming',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPost.validateParams,
    handlers.campus.postCampusPost.logic,
    handlers.campus.postCampusPost.response);

  apiRouter.post('/campus/student-group/post/:postId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostReply.validateParams,
    handlers.campus.postCampusPostReply.logic,
    handlers.campus.postCampusPostReply.response);

  apiRouter.post('/campus/student-group/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostLike.validateParams,
    handlers.campus.postCampusPostLike.logic,
    handlers.campus.postCampusPostLike.response);

  apiRouter.post('/campus/student-group/post/:postId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostPageview.validateParams,
    handlers.campus.postCampusPostPageview.logic,
    handlers.campus.postCampusPostPageview.response);

  apiRouter.post('/campus/student-group/post/:postId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.campus.postCampusPostRating.validateParams,
    handlers.campus.postCampusPostRating.logic,
    handlers.campus.postCampusPostRating.response);

  apiRouter.post('/campus/student-group/post/:postId/report',
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
