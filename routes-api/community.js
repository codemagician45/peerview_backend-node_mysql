'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function communityApi (apiRouter) {
  apiRouter.get('/community/posts',
    lib.params,
    handlers.community.getCommunityPosts.validateParams,
    lib.isTokenExist.user,
    handlers.community.getCommunityPosts.logic,
    handlers.community.getCommunityPosts.response);

  apiRouter.get('/community/post/:communityPostId',
    lib.params,
    handlers.community.getCommunityPost.validateParams,
    lib.isTokenExist.user,
    handlers.community.getCommunityPost.logic,
    handlers.community.getCommunityPost.response);

  apiRouter.post('/community/post',
    lib.params,
    handlers.community.postCommunityPost.validateParams,
    lib.isTokenExist.user,
    handlers.community.postCommunityPost.logic,
    handlers.community.postCommunityPost.response);

  apiRouter.post('/community/reply',
    lib.params,
    handlers.community.postCommunityPostReply.validateParams,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostReply.logic,
    handlers.community.postCommunityPostReply.response);

  apiRouter.post('/community/rating',
    lib.params,
    handlers.community.postCommunityPostRating.validateParams,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostRating.logic,
    handlers.community.postCommunityPostRating.response);

  apiRouter.post('/community/like',
    lib.params,
    handlers.community.postCommunityPostLike.validateParams,
    lib.isTokenExist.user,
    handlers.community.postCommunityPostLike.logic,
    handlers.community.postCommunityPostLike.response);
}

module.exports = communityApi;
