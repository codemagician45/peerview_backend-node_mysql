/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let defaultApi = (api) => {
  api.post('/',
    lib.isTokenExist.user,
    handlers.post.postPost.validateParams,
    handlers.post.postPost.logic,
    handlers.post.postPost.saveAttachments,
    lib.userCredits.updateUserCredits,
    (req, res, next) => {
      if (req.$params.postTo) {
        return lib.notification.tagInPostNotification(req, res, next);
      }

      next();
    },
    handlers.post.postPost.response);
};

module.exports = defaultApi;
