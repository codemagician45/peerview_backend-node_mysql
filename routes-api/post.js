'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function postApi (apiRouter) {
  apiRouter.get('/posts',
    lib.isTokenExist.user,
    handlers.post.getPosts.validateParams,
    handlers.post.getPosts.logic,
    handlers.post.getPosts.response);

  apiRouter.get('/post/:postId',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.getPost.validateParams,
    handlers.post.getPost.logic,
    handlers.post.getPost.response);

  apiRouter.get('/post/category/:categoryCode',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.getPostCategoryId.validateParams,
    handlers.post.getPostCategoryId.logic,
    handlers.post.getPostCategoryId.response);

  apiRouter.post('/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPost.validateParams,
    handlers.post.postPost.logic,
    handlers.post.postPost.saveAttachments,
    lib.userCredits.updateUserCredits,
    handlers.post.postPost.response);

  apiRouter.post('/post/:postId/reply',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPostReply.validateParams,
    handlers.post.postPostReply.logic,
    lib.userCredits.updateUserCredits,
    handlers.post.postPostReply.response);

  apiRouter.post('/post/:postId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPostRating.validateParams,
    handlers.post.postPostRating.logic,
    handlers.post.postPostRating.averageRating,
    lib.userCredits.updateUserCreditsUponRating,
    handlers.post.postPostRating.response);

  apiRouter.post('/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPostLike.validateParams,
    handlers.post.postPostLike.logic,
    handlers.post.postPostLike.response);

  apiRouter.post('/post/:postId/pageview',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPostPageview.validateParams,
    handlers.post.postPostPageview.logic,
    handlers.post.postPostPageview.response);

  apiRouter.post('/post/share/:sharePostId',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postSharePost.validateParams,
    handlers.post.postSharePost.logic,
    handlers.post.postSharePost.response);

  apiRouter.post('/post/:postId/report',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPostReport.validateParams,
    handlers.post.postPostReport.logic,
    handlers.post.postPostReport.response);

  apiRouter.post('/post/story',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPost.validateParams,
    handlers.post.postPost.logic,
    handlers.post.postPost.response);

  apiRouter.post('/post/poll',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPost.validateParams,
    handlers.post.postPost.logic,
    handlers.post.postPost.savePostPollOption,
    handlers.post.postPost.response);
}

module.exports = postApi;
