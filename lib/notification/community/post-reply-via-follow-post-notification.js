/*eslint-disable max-nested-callbacks*/
'use strict';

const looPromise = require('../loop-promise');

const postReplyViaFollowPostNotification = (req, res, next) => {
  next();
  let user = req.$scope.user;
  let postId = req.params.postId;
  let counter = 0;

  return getPostFollowedUserList(req)
  .then((followPostList) => {
    let followPost = followPostList[counter];
    looPromise(() => {
      return counter < followPostList.length;
    }, () => {
      return new Promise((resolve) => {
        req.db.notification
        .create({
          area: 'community',
          type: 'replyViaFollowPost',
          subjectId: user.id,
          recipientId: followPost.userId,
          postv1Id: postId
        })
        .then(() => {
          resolve(true);
          counter += 1;
        })
        .catch(() => {
          resolve(true);
          counter += 1;
        });
      });
    });
  });
};

const getPostFollowedUserList = (req) => {
  let postId = req.params.postId;

  return req.db.followPost
  .findAll({
    where: {
      postv1Id: postId
    }
  })
  .then((followPostList) => {
    return followPostList;
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

module.exports.postReplyViaFollowPostNotification = postReplyViaFollowPostNotification;
