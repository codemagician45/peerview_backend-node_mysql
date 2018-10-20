'use strict';

const rpc = require('./rpc');
const httpCodes = require('./http-codes');

const postReplyNotification = (req, res, next) => {
  const subject = req.$params.user;
  const postId = req.$params.postId;

  return req.db
  .notification
  .create({
    postId: postId,
    subjectId: subject.id,
    type: 'postReply',
    message: 'replied to your post'
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

module.exports.createPostReplyNotification = postReplyNotification;