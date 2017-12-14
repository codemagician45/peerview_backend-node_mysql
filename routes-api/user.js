'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function userApi (apiRouter) {
  apiRouter.get('/users',
    lib.params,
    handlers.user.getUsers.logic,
    handlers.user.getUsers.response);

  apiRouter.get('/user/:userId',
    lib.params,
    handlers.user.getUser.validateParams,
    lib.isTokenExist.user,
    handlers.user.getUser.logic,
    handlers.user.getUser.response);

  apiRouter.get('/user-study-levels',
    lib.params,
    handlers.user.getUserStudyLevels.validateParams,
    lib.isTokenExist.user,
    handlers.user.getUserStudyLevels.logic,
    handlers.user.getUserStudyLevels.response);

  apiRouter.get('/user/type/:typeName',
    lib.params,
    handlers.user.getUserTypeId.validateParams,
    lib.isTokenExist.user,
    handlers.user.getUserTypeId.logic,
    handlers.user.getUserTypeId.response);

  apiRouter.get('/user/profile-picture',
    lib.params,
    handlers.user.getUserProfilePicture.validateParams,
    lib.isTokenExist.user,
    handlers.user.getUserProfilePicture.logic,
    handlers.user.getUserProfilePicture.response);

  apiRouter.post('/user/login',
    lib.params,
    handlers.user.postUserLogin.validateParams,
    handlers.user.postUserLogin.logic,
    handlers.user.postUserLogin.response);

  apiRouter.post('/user/social-login',
    lib.params,
    handlers.user.postUserSocialLogin.validateParams,
    handlers.user.postUserSocialLogin.findUser,
    handlers.user.postUserSocialLogin.saveOrUpdateUser,
    handlers.user.postUserSocialLogin.response);

  apiRouter.post('/user/register',
    lib.params,
    handlers.user.postUserRegister.validateParams,
    handlers.user.postUserRegister.validatePasswordAndConfirmPassword,
    handlers.user.postUserRegister.checkifEmailIsExisted,
    handlers.user.postUserRegister.logic,
    handlers.user.postUserRegister.response);

  apiRouter.post('/user/type-details',
    lib.params,
    handlers.user.postUserTypeDetails.validateParams,
    lib.isTokenExist.user,
    handlers.user.postUserTypeDetails.logic,
    handlers.user.postUserTypeDetails.response);

  apiRouter.post('/user/interests',
    lib.params,
    handlers.user.postUserInterests.validateParams,
    lib.isTokenExist.user,
    handlers.user.postUserInterests.logic,
    handlers.user.postUserInterests.response);

  apiRouter.post('/user/forgot-password',
    lib.params,
    handlers.user.postUserForgotPassword.validateParams,
    handlers.user.postUserForgotPassword.findUser,
    handlers.user.postUserForgotPassword.logic,
    handlers.user.postUserForgotPassword.sendEmail,
    handlers.user.postUserForgotPassword.response);

  apiRouter.put('/user/gender',
    lib.params,
    handlers.user.updateUserGender.validateParams,
    lib.isTokenExist.user,
    handlers.user.updateUserGender.logic,
    handlers.user.updateUserGender.response);

  apiRouter.put('/user/new-password',
    lib.params,
    handlers.user.updateUserNewPassword.validateParams,
    handlers.user.updateUserNewPassword.validatePasswordAndConfirmPassword,
    handlers.user.updateUserNewPassword.checkUserCurrentPassword,
    lib.isTokenExist.user,
    handlers.user.updateUserNewPassword.logic,
    handlers.user.updateUserNewPassword.response);

  apiRouter.put('/user/password',
    lib.params,
    handlers.user.updateUserPassword.validateParams,
    lib.isTokenExist.user,
    handlers.user.updateUserPassword.logic,
    handlers.user.updateUserPassword.response);

  apiRouter.put('/user/profile-picture',
    lib.params,
    handlers.user.updateUserProfilePicture.validateParams,
    lib.isTokenExist.user,
    lib.upload.single,
    handlers.user.updateUserProfilePicture.logic,
    handlers.user.updateUserProfilePicture.response);

  apiRouter.put('/user/:userId/security',
    lib.params,
    handlers.user.updateUserSecurity.validateParams,
    lib.isTokenExist.user,
    handlers.user.updateUserSecurity.logic,
    handlers.user.updateUserSecurity.response);

  apiRouter.delete('/user/interest/:userInterestId',
    lib.params,
    handlers.user.removeUserInterest.validateParams,
    lib.isTokenExist.user,
    handlers.user.removeUserInterest.logic,
    handlers.user.removeUserInterest.response);
}

module.exports = userApi;
