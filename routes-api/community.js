'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function communityApi (apiRouter) {
  apiRouter.get('/community/posts', // public community posts;isCareer to get the career post
    lib.params,
    lib.isTokenExist.user,
    handlers.community.getCommunityPosts.validateParams,
    handlers.community.getCommunityPosts.checkUserType,
    handlers.community.getCommunityPosts.getProfessionalsUserTypeId,
    handlers.community.getCommunityPosts.logic,
    handlers.community.getCommunityPosts.response);

  apiRouter.get('/community/career/posts', // public community posts;isCareer to get the career post
    lib.params,
    lib.isTokenExist.user,
    handlers.community.getCommunityPosts.validateParams,
    handlers.community.getCommunityPosts.logic,
    handlers.community.getCommunityPosts.response);

  apiRouter.get('/community/:communityId/posts', // private community posts
    lib.params,
    lib.isTokenExist.user,
    handlers.community.getCommunityPosts.validateParams,
    handlers.community.getCommunityPosts.getPrivateCommunityPosts,
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

  apiRouter.post('/community/post', // public community student and professionals can post
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPost.validateParams,
    handlers.community.postCommunityPost.logic,
    handlers.community.postCommunityPost.response);

  apiRouter.post('/community/post/career',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPost.validateParams,
    handlers.community.postCommunityPost.logic,
    handlers.community.postCommunityPost.response);

  apiRouter.post('/community/:communityId/post', // private community
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPost.validateParams,
    handlers.community.postCommunityPost.logic,
    handlers.community.postCommunityPost.response);

  apiRouter.post('/community/:communityId/post/poll', // private community poll; we don't have public poll
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPost.validateParams,
    handlers.community.postCommunityPost.logic,
    handlers.community.postCommunityPost.saveCommunityPostPollOption,
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

  apiRouter.post('/community/:communityId/post/brainstorming',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.postCommunityPost.validateParams,
    handlers.community.postCommunityPost.logic,
    handlers.community.postCommunityPost.response);

  apiRouter.put('/community/:communityPostId/post/brainstorming',
    lib.params,
    lib.isTokenExist.user,
    handlers.community.updateCommunityPost.validateParams,
    handlers.community.updateCommunityPost.logic,
    handlers.community.updateCommunityPost.response);
}

module.exports = communityApi;
