'use strict';

const rpc = require('./rpc');
const httpCodes = require('./http-codes');
const emailFor10MinsOfflineUserNotification = require('./email-for-10min-offline-user-notification');
const templates = require('../templates');

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
  let comment = req.$params.comment;
  const sequelize = req.db.post.sequelize;

  if (subject.id === recipientId) {
    next();
    return;
  }

  // Email sending section start
  req.db.post.findAll({
    attributes: [
      'id',
      'message',
      'title',
      'createdAt',
      [sequelize.where(sequelize.col('post.userId'), subject.id), 'isPostUser']
    ],
    include: [{
      model: req.db.user,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture', 'socialImage']
    }],
    group: ['id'],
    where: {
      id: {
        [req.Op.eq]: postId
      }
    }
  })
  .then((posts) => {
    let file = templates.communityReply;

    if(posts.length > 0) {

      let emailSubject = `${subject.name} recently commented on your post!`;

      let valuesForEmail = {
        postOwner: posts[0].user.name,
        userWhoCommented: subject.name,
        comment: comment,
        post: posts[0]
      };
      
      emailFor10MinsOfflineUserNotification.tenMinsEmail(req, emailSubject, file, valuesForEmail, posts[0].user);
    }
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.findAll Error - get-post');
  });
  // Email sending section end

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
  let comment = req.$params.comment;
  const sequelize = req.db.post.sequelize;

  if (subject.id === recipientId) {
    next();
    return;
  }

  // Email sending section start
  req.db.postv1.findAll({
    attributes: [
      'id',
      'message',
      'title',
      'createdAt',
      [sequelize.where(sequelize.col('postv1.userId'), subject.id), 'isPostUser']
    ],
    include: [{
      model: req.db.user,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture', 'socialImage']
    },{
      model: req.db.user,
      as: 'followers',
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture', 'socialImage']
    }],
    group: ['id'],
    where: {
      id: {
        [req.Op.eq]: postId
      }
    }
  })
  .then((posts) => {
      console.log('community post reply');
    let file = templates.communityReply;

    if(posts.length > 0) {

      let emailSubject = `${subject.name} recently commented on your post!`;

      let valuesForEmail = {
        postOwner: posts[0].user.name,
        userWhoCommented: subject.name,
        comment: comment,
        post: posts[0]
      };
      
      emailFor10MinsOfflineUserNotification.tenMinsEmail(req, emailSubject, file, valuesForEmail, posts[0].user);

      if(posts[0].followers.length > 0) {
        let followers = posts[0].followers;

        for (let key in followers) {
          valuesForEmail = {
            postOwner: followers[key].name,
            userWhoCommented: subject.name,
            comment: comment,
            post: posts[0]
          };

          emailFor10MinsOfflineUserNotification.tenMinsEmail(req, emailSubject, file, valuesForEmail, followers[key]);
        }
      }
    }
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.findAll Error - get-post');
  });
  // Email sending section end


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