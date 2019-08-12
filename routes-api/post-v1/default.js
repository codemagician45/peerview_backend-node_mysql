/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let defaultApi = (api) => {
  api.get('/v2/community/course/:courseId/:postId', // public community student and professionals can post
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.getPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.getPostV1.logic,
    handlers.post.getPostV1.followlogic,
    handlers.post.getPostV1.response);

  api.get('/v2/community/:communityId/:postId', // private community
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.getPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.getPostV1.logic,
    handlers.post.getPostV1.response);

  api.post('/v2/community/course/:courseId', // public community which includes course
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.user.getUsersSearchViaCourseId.getUsers,
    handlers.post.postPostV1.logic,
    handlers.post.postPostV1.saveAttachments,
    lib.userCredits.updateUserCredits,
    lib.notification.communityPostNotification,
    handlers.post.postPostV1.response);

  api.post('/v2/community/:communityId', // private community
    lib.isTokenExist.user,
    lib.schemaValidator.validateParams(handlers.post.postPostV1.querySchema),
    lib.schemaValidator.validationResult,
    handlers.post.postPostV1.logic,
    handlers.post.postPostV1.saveAttachments,
    lib.userCredits.updateUserCredits,
    handlers.post.postPostV1.response);

  api.delete('/v2/community/:postId', // Delete community post
    lib.params,
    lib.isTokenExist.user,
    handlers.post.removePostV1.validateParams,
    handlers.post.removePostV1.logic,
    handlers.post.removePostV1.response);
};

module.exports = defaultApi;
