'use strict';

const looPromise = require('../loop-promise');

const postReplyLikeNotification = (req, res, next) => {
  next();
  let user = req.$scope.user;
  let userId = req.$params.userId;
  let replyId = req.params.replyId;

  req.db.notification
  .create({
    area: 'community',
    type: 'replyLike',
    subjectId: user.id,
    recipientId: userId,
    replyId: replyId
  })
  .then((notification) => {
    return notification;
  });
};

module.exports.postReplyLikeNotification = postReplyLikeNotification;
