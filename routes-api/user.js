/*eslint-disable max-statements,max-lines*/
'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function userApi (apiRouter) {
  apiRouter.get('/user/by-jot-token/:jotToken',
    lib.params,
    handlers.user.getUserByJotToken.validateParams,
    handlers.user.getUserByJotToken.logic,
    handlers.user.getUserByJotToken.response);

  apiRouter.get('/users',
    lib.params,
    handlers.user.getUsers.logic,
    handlers.user.getUsers.response);

  apiRouter.get('/user/profile',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUserProfile.logic,
    handlers.user.getUserProfile.response);

  apiRouter.get('/user/work-experience',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUserWorkExperience.validateParams,
    handlers.user.getUserWorkExperience.logic);

  apiRouter.get('/user/skill',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUserSkill.validateParams,
    handlers.user.getUserSkill.logic);

  apiRouter.get('/user/posts',
    lib.isTokenExist.user,
    handlers.user.getUserProfile.logic,
    handlers.user.getUserProfile.response);

  apiRouter.get('/user/interests',
    lib.isTokenExist.user,
    handlers.user.getUserInterests.logic,
    handlers.user.getUserInterests.response);

  apiRouter.get('/user/peers-list',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUserPeersList.getUserCourse,
    handlers.user.getUserPeersList.logic,
    handlers.user.getUserPeersList.response);

  apiRouter.get('/user/:userId/info',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUser.logic,
    handlers.user.getUser.response);

  apiRouter.get('/user/credits',
    lib.isTokenExist.user,
    handlers.user.getUserCredits.logic,
    handlers.user.getUserCredits.response);

  apiRouter.get('/user/type/:typeCode',
    lib.params,
    handlers.user.getUserTypeId.validateParams,
    lib.isTokenExist.user,
    handlers.user.getUserTypeId.logic,
    handlers.user.getUserTypeId.response);

  apiRouter.get('/user/timeline',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUserTimeline.validateParams,
    handlers.user.getUserTimeline.getPosts,
    handlers.user.getUserTimeline.response);

  apiRouter.get('/user/followee/:userId',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUserFollowee.logic,
    handlers.user.getUserFollowee.response);

  apiRouter.get('/user/followers/:userId',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.getUserFollower.logic,
    handlers.user.getUserFollower.response);

  apiRouter.post('/user/:postToId/post',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.postUserPostTo.validateParams,
    handlers.user.postUserPostTo.logic,
    handlers.user.postUserPostTo.response);

  apiRouter.post('/user/:userId/message',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.postUserMessage.validateParams,
    handlers.user.postUserMessage.checkUserPrivacy,
    handlers.user.postUserMessage.logic,
    handlers.user.postUserMessage.response);

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
    handlers.user.postUserSocialLogin.getUserProfile,
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

  apiRouter.post('/user/invite-user',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.postUserInvitePeers.validateParams,
    handlers.user.postUserInvitePeers.logic,
    handlers.user.postUserInvitePeers.checkIfUserAlreadyInvited,
    handlers.user.postUserInvitePeers.sendEmail,
    handlers.user.postUserInvitePeers.response);

  apiRouter.post('/user/send-verify-code',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.sendVerifyEmailCode.logic);

  apiRouter.post('/user/verify-changed-email',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.verifyChangedEmail.logic);

  apiRouter.put('/user/about-me',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserAboutme.validateParams,
    handlers.user.updateUserAboutme.logic,
    handlers.user.updateUserAboutme.response);

  apiRouter.put('/user/accomplishments',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserAccomplishments.validateParams,
    handlers.user.updateUserAccomplishments.logic,
    handlers.user.updateUserAccomplishments.response);

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

  apiRouter.put('/user/security',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserSecurity.validateParams,
    handlers.user.updateUserSecurity.logic,
    handlers.user.updateUserSecurity.response);

  apiRouter.put('/user/name',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserName.validateParams,
    handlers.user.updateUserName.logic,
    handlers.user.updateUserName.response);

  apiRouter.put('/user/email',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserEmail.validateParams,
    handlers.user.updateUserEmail.logic,
    handlers.user.updateUserEmail.response);

  apiRouter.put('/user/language',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserLanguage.validateParams,
    handlers.user.updateUserLanguage.logic,
    handlers.user.updateUserLanguage.response);

  apiRouter.post('/user/update-social-links',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserSetting.updateSocialLinks);

  apiRouter.post('/user/general-setting',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.updateUserSetting.updateGeneralSetting);

  apiRouter.post('/user/add-work-experience',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.userWorkExperience.addWorkExperience);

  apiRouter.post('/user/add-skill',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.userSkill.addSkill);

  apiRouter.post('/user/update-work-experience',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.userWorkExperience.updateWorkExperience);
    
  apiRouter.post('/user/save-gpa',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.userGpa.saveGPA);

  apiRouter.delete('/user/:userId/follow',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.removeUserFollow.validateParams,
    handlers.user.removeUserFollow.logic,
    lib.userCredits.updateUserCredits,
    handlers.user.removeUserFollow.response);

  apiRouter.delete('/user/interest/:interestId',
    lib.params,
    lib.isTokenExist.user,
    handlers.user.removeUserInterest.validateParams,
    handlers.user.removeUserInterest.logic,
    handlers.user.removeUserInterest.response);

  //code for get all users who are inactive more than 72 hr
  apiRouter.get('/users/72hOfflineUsers',
    handlers.user.getOfflineUsers.getUser,
    handlers.user.getOfflineUsers.getUserPosts,
    handlers.user.getOfflineUsers.getUserTimelinePosts,
    handlers.user.getOfflineUsers.sendMail,
    handlers.user.getOfflineUsers.response);

  apiRouter.get('/users/offlineTimelinedata',
    handlers.user.getOfflineUsersTimeline.logic,
    handlers.user.getOfflineUsersTimeline.response);

  apiRouter.get('/users/offlinecommunityData',
    handlers.user.getOfflineUsersCommunity.logic,
    handlers.user.getOfflineUsersCommunity.response);
}


module.exports = userApi;
