'use strict';

const postReplyViaReplyNotification = (req, res, next) => {
  next();
  let user = req.$scope.user;
  let replyId = req.$params.replyId;
  let userId = req.$params.userId;

  req.db.notification
  .create({
    area: 'community',
    type: 'replyViaReply',
    subjectId: user.id,
    recipientId: userId,
    replyId: replyId
  })
  .then((notification) => {
    return notification;
  });
};

module.exports.postReplyViaReplyNotification = postReplyViaReplyNotification;
