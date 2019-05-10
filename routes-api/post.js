'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function postApi (apiRouter) {
  apiRouter.get('/posts',
    lib.params,
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
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostReply.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostReply.logic,
    lib.userCredits.updateUserCredits,
    lib.notification.createPostReplyNotification,
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
    handlers.post.getPost.logic,
    handlers.post.postPostLike.logic,
    lib.notification.postLikeNotification,
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
    handlers.post.getPost.logic,
    handlers.post.postSharePost.logic,
    lib.notification.postShareNotification,
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

  apiRouter.post('/post/poll/:postPollOptionId',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPollOptionVote.validateParams,
    handlers.post.postPollOptionVote.logic,
    handlers.post.postPollOptionVote.response);

  apiRouter.put('/post/:postId',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.updatePost.validateParams,
    handlers.post.updatePost.logic,
    handlers.post.updatePost.response);

  apiRouter.delete('/post/:postId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.removePostLike.validateParams,
    handlers.post.removePostLike.logic,
    handlers.post.removePostLike.response);

  apiRouter.delete('/post/:postId',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.removePost.validateParams,
    handlers.post.removePost.logic,
    handlers.post.removePost.response);

  apiRouter.delete('/post/reply/:replyId',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.removePostReplyComment.validateParams,
    handlers.post.removePostReplyComment.logic,
    handlers.post.removePostReplyComment.response);

  apiRouter.post('/post/reply/:postReplyId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPostCommentLike.validateParams,
    handlers.post.postPostCommentLike.logic,
    handlers.post.postPostCommentLike.response);

  apiRouter.delete('/post/reply/:postReplyId/like',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.removePostCommentLike.validateParams,
    handlers.post.removePostCommentLike.logic,
    handlers.post.removePostCommentLike.response);

  apiRouter.post('/post/reply/:postReplyId/rating',
    lib.params,
    lib.isTokenExist.user,
    handlers.post.postPostCommentRating.validateParams,
    handlers.post.postPostCommentRating.logic,
    handlers.post.postPostCommentRating.averageRating,
    lib.userCredits.updateUserCreditsUponRating,
    handlers.post.postPostCommentRating.response);
}

module.exports = postApi;
