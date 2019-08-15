'use strict';

const rpc = require('./rpc');
const httpCodes = require('./http-codes');
const emailFor10MinsOfflineUserNotification = require('./email-for-10min-offline-user-notification');

const newFollowerNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let recipientId = req.params.userId;

  return req.db
  .notification
  .create({
    subjectId: subject.id,
    recipientId: recipientId,
    type: 'newFollower',
    message: 'followed you.',
    isRead: false
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
  .findOrCreate({
    where: {
      recipientId: recipientId,
      subjectId: subject.id,
      postId: postId,
      type: 'postLike',
      message: 'liked'
    },
    defaults: {
      recipientId: recipientId,
      subjectId: subject.id,
      postId: postId,
      type: 'postLike',
      message: 'liked',
      area: 'home',
      isRead: false
    }
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

  if (subject.id === recipientId) {
    next();
    return;
  }

  // Email sending section
  let valuesForEmail = {

  };
  
  emailFor10MinsOfflineUserNotification.tenMinsEmail();

  return req.db
  .notification
  .create({
    recipientId: recipientId,
    subjectId: subject.id,
    postId: postId,
    type: 'postReply',
    message: 'Commented on',
    area: 'home',
    isRead: false
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
    area: 'home',
    isRead: false
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
    area: 'community',
    isRead: false
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

const postCommunityPost = (req, res, next) => {
  let subject = req.$scope.user;
  let courseId = req.params.courseId;
  let postId = req.$scope.postv1.id;
  const courseUsers = req.$scope.courseUsers;
  let index = courseUsers.findIndex((value) => {
    return value.id === subject.id;
  });
  if (index > -1) {
    courseUsers.splice(index, 1);
  }
  if (!courseUsers) {
    next();
    return;
  }

  let insertNotification = [];
  courseUsers.forEach((value) => {
    insertNotification.push({
      subjectId: subject.id,
      recipientId: value.id,
      postv1Id: postId,
      courseId: courseId,
      type: 'communityQuestionPost',
      message: 'was posted in the',
      area: 'community',
      isRead: false
    });
  });
  return req.db
  .notification
  .bulkCreate(insertNotification)
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

const postCommunityPostReply = (req, res, next) => {
  let subject = req.$scope.user;
  let recipientId = req.$scope.post.user.id;
  let postId = req.params.postId;
  let courseId = req.$params.courseId;
  if (subject.id === recipientId) {
    next();
    return;
  }
  return req.db
  .notification
  .create({
    recipientId: recipientId,
    subjectId: subject.id,
    postv1Id: postId,
    courseId: courseId,
    type: 'communityQuestionReply',
    message: 'answered to',
    area: 'community',
    isRead: false
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
    message: 'You were tagged by',
    isRead: false
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
module.exports.communityPostNotification = postCommunityPost;
module.exports.communityPostReplyNotification = postCommunityPostReply;
module.exports.tagInPostNotification = tagInPostNotification;