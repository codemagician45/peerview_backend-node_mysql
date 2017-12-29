'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function userApi (apiRouter) {
  apiRouter.get('/users',
    lib.params,
    handlers.user.getUsers.logic,
    handlers.user.getUsers.response);

  // apiRouter.get('/user/:userId', this must be /user only
  //   lib.params,
  //   handlers.user.getUser.validateParams,
  //   lib.isTokenExist.user,
  //   handlers.user.getUser.logic,
  //   handlers.user.getUser.response);

  apiRouter.get('/user/credits',
    lib.isTokenExist.user,
    handlers.user.getUserCredits.logic,
    handlers.user.getUserCredits.response);

  apiRouter.get('/user/study-levels',
    lib.isTokenExist.user,
    handlers.user.getUserStudyLevels.logic,
    handlers.user.getUserStudyLevels.response);

  apiRouter.get('/user/type/:typeCode',
    lib.params,
    handlers.user.getUserTypeId.validateParams,
    lib.isTokenExist.user,
    handlers.user.getUserTypeId.logic,
    handlers.user.getUserTypeId.response);

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
    handlers.user.postUserRegister.sendEmail,
    handlers.user.postUserRegister.response);

  apiRouter.post('/user/forgot-password',
    lib.params,
    handlers.user.postUserForgotPassword.validateParams,
    handlers.user.postUserForgotPassword.findUser,
    handlers.user.postUserForgotPassword.logic,
    handlers.user.postUserForgotPassword.sendEmail,
    handlers.user.postUserForgotPassword.response);

  apiRouter.post('/user/verify-email/:jotToken',
    lib.params,
    handlers.user.postUserVerifyEmail.validateParams,
    handlers.user.postUserVerifyEmail.findUser,
    handlers.user.postUserVerifyEmail.logic,
    handlers.user.postUserVerifyEmail.response);

  apiRouter.post('/user/interests',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.postUserInterests.validateParams,
    handlers.user.postUserInterests.logic,
    handlers.user.postUserInterests.checkUserType,
    handlers.user.postUserInterests.sendEmail,
    handlers.user.postUserInterests.response);

  apiRouter.post('/user/onboarding/details',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.postUserOnboardingDetails.checkUserType,
    handlers.user.postUserOnboardingDetails.validateParams,
    handlers.user.postUserOnboardingDetails.logic,
    handlers.user.postUserOnboardingDetails.response);

  apiRouter.post('/user/:userId/follow',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.postUserFollow.validateParams,
    handlers.user.postUserFollow.logic,
    handlers.user.postUserFollow.sendEmail,
    lib.userCredits.updateUserCredits,
    handlers.user.postUserFollow.response);

  apiRouter.post('/user/invite-user',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.postUserInvitePeers.validateParams,
    handlers.user.postUserInvitePeers.logic,
    handlers.user.postUserInvitePeers.checkIfUserAlreadyInvited,
    handlers.user.postUserInvitePeers.sendEmail,
    handlers.user.postUserInvitePeers.response);

  apiRouter.put('/user/password',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserPassword.validateParams,
    handlers.user.updateUserPassword.validatePasswordAndConfirmPassword,
    handlers.user.updateUserPassword.checkUserCurrentPassword,
    handlers.user.updateUserPassword.logic,
    handlers.user.updateUserPassword.response);

  apiRouter.put('/user/password-reset/:jotToken', // use as a setter after the post-user-forgot-password
    lib.params,
    handlers.user.updateUserPasswordReset.validateParams,
    handlers.user.updateUserPasswordReset.validatePasswordAndConfirmPassword,
    handlers.user.updateUserPasswordReset.logic,
    handlers.user.updateUserPasswordReset.response);

  apiRouter.put('/user/profile-picture',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserProfilePicture.validateParams,
    handlers.user.updateUserProfilePicture.logic,
    handlers.user.updateUserProfilePicture.response);

  apiRouter.put('/user/:userId/security',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserSecurity.validateParams,
    handlers.user.updateUserSecurity.logic,
    handlers.user.updateUserSecurity.response);

  apiRouter.delete('/user/:userId/follow',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.removeUserFollow.validateParams,
    handlers.user.removeUserFollow.logic,
    lib.userCredits.updateUserCredits,
    handlers.user.removeUserFollow.response);

  apiRouter.delete('/user/interest/:userInterestId',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.removeUserInterest.validateParams,
    handlers.user.removeUserInterest.logic,
    handlers.user.removeUserInterest.response);
}

module.exports = userApi;
