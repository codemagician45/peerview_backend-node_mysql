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

  api.post('/v2', // public community student and professionals can post
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostV1.logic,
    handlers.post.postPostV1.saveAttachments,
    lib.userCredits.updateUserCredits,
    handlers.post.postPostV1.response);
};

module.exports = defaultApi;
