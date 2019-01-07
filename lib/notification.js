'use strict';

const rpc = require('./rpc');
const httpCodes = require('./http-codes');

const newFollowerNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let recipientId = req.params.userId;

  return req.db
    .notification
    .create({
      subjectId: subject.id,
      recipientId: recipientId,
      type: 'newFollower',
      message: 'followed you.'
    })
    .then((notification) => {
      next();
      return notification;
    })
    .catch((error) => {
      req.log.error({
        error: error
      }, 'lib.notification notification [notification.create] Error');

      return res.status(httpCodes.SERVER_ERROR)
        .send(new rpc.InternalError(error));
    });
};

const postLikeNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let postId = req.params.postId;
  let recipientId = req.$scope.post.user.id;

  return req.db
    .notification
    .create({
      recipientId: recipientId,
      subjectId: subject.id,
      postId: postId,
      type: 'postLike',
      message: 'liked',
      area: 'home'
    })
    .then((notification) => {
      next();
      return notification;
    })
    .catch((error) => {
      req.log.error({
        error: error
      }, 'lib.notification notification [notification.create] Error');

      return res.status(httpCodes.SERVER_ERROR)
        .send(new rpc.InternalError(error));
    });
};

const postReplyNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let recipientId = req.$params.recipientId;
  let postId = req.params.postId;

  return req.db
  .notification
  .create({
    recipientId: recipientId,
    subjectId: subject.id,
    postId: postId,
    type: 'postReply',
    message: 'Commented on',
    area: 'home'
  })
  .then((notification) => {
    next();
    return notification;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'lib.notification notification [notification.create] Error');

    return res.status(httpCodes.SERVER_ERROR)
    .send(new rpc.InternalError(error));
  });
};

const postShareNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let sharePostId = req.$params.sharePostId;
  let recipientId = req.$scope.post.user.id;

  return req.db
    .notification
    .create({
      recipientId: recipientId,
      subjectId: subject.id,
      postId: sharePostId,
      type: 'postShare',
      message: 'shared',
      area: 'home'
    })
    .then((notification) => {
      next();
      return notification;
    })
    .catch((error) => {
      req.log.error({
        error: error
      }, 'lib.notification notification [notification.create] Error');

      return res.status(httpCodes.SERVER_ERROR)
        .send(new rpc.InternalError(error));
    });
};

const postCommunityPostFollow = (req, res, next) => {
  let subject = req.$scope.user;
  let courseId = req.$params.courseId;
  let postId = req.$params.postId;
  let recipientId = req.$scope.post.user.id;

  return req.db
    .notification
    .create({
      subjectId: subject.id,
      recipientId: recipientId,
      postv1Id: postId,
      courseId: courseId,
      type: 'communityQuestionFollow',
      message: 'replied to',
      area: 'community'
    })
    .then((notification) => {
      next();
      return notification;
    })
    .catch((error) => {
      req.log.error({
        error: error
      }, 'lib.notification notification [notification.create] Error');

      return res.status(httpCodes.SERVER_ERROR)
        .send(new rpc.InternalError(error));
    });
};

const tagInPostNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let recipientId = req.params.recipientId;

  return req.db
  .notification
  .create({
    recipientId: recipientId,
    subjectId: subject.id,
    type: 'postTag',
    message: 'You were tagged by'
  })
  .then((notification) => {
    next();
    return notification;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'lib.notification notification [notification.create] Error');

    return res.status(httpCodes.SERVER_ERROR)
    .send(new rpc.InternalError(error));
  });
};

module.exports.newFollowerNotification = newFollowerNotification;
module.exports.postLikeNotification = postLikeNotification;
module.exports.createPostReplyNotification = postReplyNotification;
module.exports.postShareNotification = postShareNotification;
module.exports.postCommunityPostFollow = postCommunityPostFollow;
module.exports.tagInPostNotification = tagInPostNotification;