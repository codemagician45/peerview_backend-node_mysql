/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let defaultApi = (api) => {
  api.get('/v2/(:communityId/)?:postId', // public community student and professionals can post
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.getPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.getPostV1.logic,
    handlers.post.getPostV1.response);

  api.post('/v2',
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostV1.logic,
    handlers.post.postPostV1.saveAttachments,
    lib.userCredits.updateUserCredits,
    (req, res, next) => {
      if (req.$params.postTo) {
        return lib.notification.tagInPostNotification(req, res, next);
      }

      next();
    },
    handlers.post.postPostV1.response);

  api.post('/v2(/:communityId)?', // public community student and professionals can post
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostV1.logic,
    handlers.post.postPostV1.saveAttachments,
    lib.userCredits.updateUserCredits,
    handlers.post.postPostV1.response);
};

module.exports = defaultApi;
