'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function postApi (apiRouter) {
  apiRouter.get('/post/rating/:postId',
    lib.params,
    handlers.post.getPostRating.validateParams,
    lib.isTokenExist.user,
    handlers.post.getPostRating.logic,
    handlers.post.getPostRating.response);

  apiRouter.post('/post',
    lib.params,
    handlers.post.postPost.validateParams,
    lib.isTokenExist.user,
    handlers.post.postPost.logic,
    handlers.post.postPost.response);

  apiRouter.post('/post/reply',
    lib.params,
    handlers.post.postPostReply.validateParams,
    lib.isTokenExist.user,
    handlers.post.postPostReply.logic,
    handlers.post.postPostReply.response);

  apiRouter.post('/post/rating',
    lib.params,
    handlers.post.postPostRating.validateParams,
    lib.isTokenExist.user,
    handlers.post.postPostRating.logic,
    handlers.post.postPostRating.response);

  apiRouter.post('/post/like',
    lib.params,
    handlers.post.postPostLike.validateParams,
    lib.isTokenExist.user,
    handlers.post.postPostLike.logic,
    handlers.post.postPostLike.response);

  apiRouter.post('/post/pageview',
    lib.params,
    handlers.post.postPostPageview.validateParams,
    lib.isTokenExist.user,
    handlers.post.postPostPageview.logic,
    handlers.post.postPostPageview.response);

  apiRouter.post('/post/share/:sharePostId',
    lib.params,
    handlers.post.postSharePost.validateParams,
    lib.isTokenExist.user,
    handlers.post.postSharePost.logic,
    handlers.post.postSharePost.response);

  apiRouter.post('/story',
    lib.params,
    handlers.post.postStory.validateParams,
    lib.isTokenExist.user,
    handlers.post.postStory.logic,
    handlers.post.postStory.response);
}

module.exports = postApi;
