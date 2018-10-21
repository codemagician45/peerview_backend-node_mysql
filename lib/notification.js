'use strict';

const rpc = require('./rpc');
const httpCodes = require('./http-codes');

const postReplyNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let recipientId = req.params.recipientId;

  return req.db
  .notification
  .create({
    recipientId: recipientId,
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

const newFollowerNotification = (req, res, next) => {
  let subject = req.$scope.user;
  let recipientId = req.$params.userId;

  return req.db
  .notification
  .create({
    subjectId: subject.id,
    recipientId: recipientId,
    type: 'newFollower',
    message: 'followed you'
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
module.exports.tagInPostNotification = tagInPostNotification;
module.exports.newFollowerNotification = newFollowerNotification;
