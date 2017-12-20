'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function communityApi (apiRouter) {
  apiRouter.get('/community/posts',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.getCommunityPosts.validateParams,
    handlers.community.getCommunityPosts.checkUserType,
    handlers.community.getCommunityPosts.getProfessionalsUserTypeId,
    handlers.community.getCommunityPosts.logic,
    handlers.community.getCommunityPosts.response);

  apiRouter.get('/community/post/:communityPostId',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.getCommunityPost.validateParams,
    handlers.community.getCommunityPost.logic,
    handlers.community.getCommunityPost.response);

  apiRouter.post('/community',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunity.validateParams,
    handlers.community.postCommunity.logic,
    handlers.community.postCommunity.inviteUsers,
    handlers.community.postCommunity.response);

  apiRouter.post('/community/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPost.validateParams,
    handlers.community.postCommunityPost.logic,
    handlers.community.postCommunityPost.response);

  apiRouter.post('/community/post/:communityPostId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostReply.validateParams,
    handlers.community.postCommunityPostReply.logic,
    handlers.community.postCommunityPostReply.response);

  apiRouter.post('/community/post/:communityPostId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostRating.validateParams,
    handlers.community.postCommunityPostRating.logic,
    handlers.community.postCommunityPostRating.response);

  apiRouter.post('/community/post/:communityPostId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostLike.validateParams,
    handlers.community.postCommunityPostLike.logic,
    handlers.community.postCommunityPostLike.response);

  apiRouter.post('/community/post/:communityPostId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostPageview.validateParams,
    handlers.community.postCommunityPostPageview.logic,
    handlers.community.postCommunityPostPageview.response);

  apiRouter.post('/community/post/:communityPostId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostReport.validateParams,
    handlers.community.postCommunityPostReport.logic,
    handlers.community.postCommunityPostReport.response);

  apiRouter.post('/community/:communityId/brainstorming/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityBrainstormingPost.validateParams,
    handlers.community.postCommunityBrainstormingPost.logic,
    handlers.community.postCommunityBrainstormingPost.response);

  apiRouter.post('/community/:communityId/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostPoll.validateParams,
    handlers.community.postCommunityPostPoll.logic,
    handlers.community.postCommunityPostPoll.saveCommunityPollOption,
    handlers.community.postCommunityPostPoll.response);

  apiRouter.put('/community/brainstorming/:brainstormingId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.updateCommunityBrainstorming.validateParams,
    handlers.community.updateCommunityBrainstorming.logic,
    handlers.community.updateCommunityBrainstorming.response);
}

module.exports = communityApi;
