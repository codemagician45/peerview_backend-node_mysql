/*eslint-disable max-lines*/
'use strict';

const express = require('express');
const validator = require('express-validator');
const apiRouter = new express.Router({mergeParams: true, strict: true});
const app = require(__dirname + '/server');
const handlers = require('./handlers');
const lib = require('./lib');
const routesApi = require('./routes-api');

/**
 * Basically this would the referrence of all the api's
 * This would be beneficial when we setup all the needed
 * testing (unit, integration).
 */
apiRouter.use(validator({
  customValidators: lib.customValidators
}));
app.use('/api/v1', apiRouter);

// basic routes
apiRouter.post('/check-token-expiry',
  lib.params,
  handlers.postTokenExpiry.validateParams,
  handlers.postTokenExpiry.logic,
  handlers.postTokenExpiry.response);

apiRouter.post('/set-new-password',
  lib.params,
  handlers.postSetNewPassword.validateParams,
  handlers.postSetNewPassword.validatePasswordAndConfirmPassword,
  handlers.postSetNewPassword.findUser,
  handlers.postSetNewPassword.updateUser,
  handlers.postSetNewPassword.response);

apiRouter.post('/verification/:userId',
  lib.params,
  handlers.postVerifyUser.validateParams,
  handlers.postVerifyUser.findUser,
  handlers.postVerifyUser.verifyUser,
  handlers.postVerifyUser.updateUser,
  handlers.postVerifyUser.response);
// end basic routes

// user route
apiRouter.post('/user',
  lib.params,
  handlers.postUser.validateParams,
  handlers.postUser.findUser,
  handlers.postUser.logic,
  handlers.postUser.response);

// apiRouter.post('/user/follow', not yet finish some
// questions needed to be answered.

apiRouter.delete('/users/:userId',
  handlers.removeUser.validateParams,
  handlers.removeUser.logic,
  handlers.removeUser.response);

routesApi.user(apiRouter);
// end user route

// user follow route
apiRouter.get('/user/followers/:followeeId',
  lib.params,
  handlers.getUserFollowersFollowee.validateParams,
  handlers.getUserFollowersFollowee.logic,
  handlers.getUserFollowersFollowee.response);

apiRouter.get('/user/followers/:followerId',
  lib.params,
  handlers.getUserFollowersFollower.validateParams,
  handlers.getUserFollowersFollower.logic,
  handlers.getUserFollowersFollower.response);
// end user follow route

apiRouter.post('/search-invite/:query',
  lib.params,
  handlers.getInviteUsers.validateParams,
  lib.isTokenExist.user,
  handlers.getInviteUsers.findUser,
  handlers.getInviteUsers.response);

apiRouter.post('/community/register',
  lib.params,
  handlers.postCommunityRegister.validateParams,
  handlers.postCommunityRegister.checkIfEmailIsExisted,
  handlers.postCommunityRegister.logic,
  handlers.postCommunityRegister.response);

apiRouter.post('/community/login',
  lib.params,
  handlers.postCommunityLogin.validateParams,
  handlers.postCommunityLogin.logic,
  handlers.postCommunityLogin.response);

apiRouter.put('/community',
  lib.params,
  handlers.updateCommunity.validateParams,
  lib.isTokenExist.communityUser,
  handlers.updateCommunity.logic,
  handlers.updateCommunity.response);

apiRouter.put('/community/password',
  lib.params,
  handlers.updateCommunityPassword.validateParams,
  handlers.updateCommunityPassword.logic,
  handlers.updateCommunityPassword.response);

apiRouter.put('/community/new-password',
  lib.params,
  handlers.updateCommunityNewPassword.validateParams,
  handlers.updateCommunityNewPassword.validatePasswordAndConfirmPassword,
  handlers.updateCommunityNewPassword.checkCommunityCurrentPassword,
  lib.isTokenExist.communityUser,
  handlers.updateCommunityNewPassword.logic,
  handlers.updateCommunityNewPassword.response);

apiRouter.post('/community/users',
  lib.params,
  handlers.postCommunityUser.validateParams,
  lib.isTokenExist.user,
  handlers.postCommunityUser.logic,
  handlers.postCommunityUser.response);

apiRouter.put('/community/user-approval',
  lib.params,
  handlers.updateCommunityUserApproval.validateParams,
  lib.isTokenExist.communityUser,
  handlers.updateCommunityUserApproval.buildNeededEmailParams,
  handlers.updateCommunityUserApproval.sendEmail,
  handlers.updateCommunityUserApproval.response);

apiRouter.get('/community/course/:communityId',
  lib.params,
  handlers.getCommunityCourse.validateParams,
  lib.isTokenExist.user,
  handlers.getCommunityCourse.logic,
  handlers.getCommunityCourse.response);

apiRouter.put('/community/course/:courseId',
  lib.params,
  handlers.updateCommunityCourse.validateParams,
  lib.isTokenExist.communityUser,
  lib.upload.single,
  handlers.updateCommunityCourse.logic,
  handlers.updateCommunityCourse.response);

apiRouter.delete('/community/course/:courseId',
  lib.params,
  handlers.removeCommunityCourse.validateParams,
  lib.isTokenExist.communityUser,
  handlers.removeCommunityCourse.logic,
  handlers.removeCommunityCourse.response);

apiRouter.post('/community/course/class'); // make this changes after we finish the rest

apiRouter.put('/community/course/class/:classId',
  lib.params,
  handlers.updateCommunityCourseClass.validateParams,
  lib.isTokenExist.communityUser,
  handlers.updateCommunityCourseClass.logic,
  handlers.updateCommunityCourseClass.response);

apiRouter.delete('/community/course/class/:classId',
  lib.params,
  handlers.removeCommunityCourseClass.validateParams,
  lib.isTokenExist.communityUser,
  handlers.removeCommunityCourseClass.logic,
  handlers.removeCommunityCourseClass.response);

/**
 * This one should be implement like this
 * /community/user/:userId/classes
 * but because we have token header in which
 * we can get the userId we just delete the param
 * userId; basically this route is getting the user classes
 * of a specified userId
 */
apiRouter.get('/community/user/classes',
  lib.params,
  handlers.getCommunityUserClasses.validateParams,
  lib.isTokenExist.user,
  handlers.getCommunityUserClasses.logic,
  handlers.getCommunityUserClasses.response);

/**
 * This route is for getting all the affected
 * or enrolled users in a specified classId
 */
apiRouter.get('/community/users/class/:classId',
  lib.params,
  handlers.getCommunityUsersClass.validateParams,
  lib.isTokenExist.communityUser,
  handlers.getCommunityUsersClass.findUserInUserClass,
  handlers.getCommunityUsersClass.logic,
  handlers.getCommunityUsersClass.response);

apiRouter.get('/community/users/society-club-folow/:societyClubId',
  lib.params,
  handlers.getCommunityUsersSocietyClubFollow.validateParams,
  lib.isTokenExist.communityUser,
  handlers.getCommunityUsersSocietyClubFollow.findUsers,
  handlers.getCommunityUsersSocietyClubFollow.logic,
  handlers.getCommunityUsersSocietyClubFollow.response);

apiRouter.post('/community/user/class',
  lib.params,
  handlers.postCommunityUserClass.validateParams,
  lib.isTokenExist.user,
  handlers.postCommunityUserClass.logic,
  handlers.postCommunityUserClass.response);

apiRouter.put('/community/user/class',
  lib.params,
  handlers.updateCommunityUserClass.validateParams,
  lib.isTokenExist.communityUser,
  handlers.updateCommunityUserClass.checkForClassLength,
  handlers.updateCommunityUserClass.removeCommunityUserClass,
  handlers.updateCommunityUserClass.logic,
  handlers.updateCommunityUserClass.response);

// groups
apiRouter.get('/groups/:privacyId',
  lib.params,
  handlers.getGroup.validateParams,
  lib.isTokenExist.user,
  handlers.getGroup.logic,
  handlers.getGroup.response);

apiRouter.put('/groups/:groupId',
  lib.params,
  handlers.updateGroup.validateParams,
  lib.isTokenExist.user,
  lib.upload.single,
  handlers.updateGroup.logic,
  handlers.updateGroup.response);

apiRouter.put('/groups/active/:groupId',
  lib.params,
  handlers.updateActiveGroup.validateParams,
  lib.isTokenExist.user,
  handlers.updateActiveGroup.logic,
  handlers.updateActiveGroup.response);

apiRouter.delete('/groups/:groupId',
  lib.params,
  handlers.removeGroup.validateParams,
  lib.isTokenExist.user,
  handlers.removeGroup.logic,
  handlers.removeGroup.response);
// end group

// societyClub
apiRouter.get('/society-clubs/user/:institutionId', // user and institution query
  lib.params,
  handlers.getSocietyClub.validateParams,
  handlers.getSocietyClub.logic,
  lib.isTokenExist.user,
  handlers.getSocietyClub.response);

apiRouter.get('/society-clubs/institution/:institutionId', // institution query only
  lib.params,
  handlers.getSocietyClub.validateParams,
  lib.isTokenExist.user,
  handlers.getSocietyClub.getAllSocietyClub,
  handlers.getSocietyClub.response);

apiRouter.put('/society-club/:societyClubId',
  lib.params,
  handlers.updateSocietyClub.validateParams,
  lib.isTokenExist.user,
  lib.upload.single,
  handlers.updateSocietyClub.logic,
  handlers.updateSocietyClub.response);

apiRouter.delete('/society-club/:societyClubId',
  lib.params,
  handlers.removeSocietyClub.validateParams,
  lib.isTokenExist.user,
  handlers.removeSocietyClub.logic,
  handlers.removeSocietyClub.response);
// end societyClub

// societyClubFollow
apiRouter.delete('/society-club-follow/unfollow/:societyClubId',
  lib.params,
  handlers.removeSocietyClubFollow.validateParams,
  lib.isTokenExist.user,
  handlers.removeSocietyClubFollow.unfollow,
  handlers.removeSocietyClubFollow.response);
// end societyClubFollow

apiRouter.delete('/jobs',
  lib.params,
  handlers.removeJob.validateParams,
  handlers.removeJob.logic,
  handlers.removeJob.response);
// end jobs

// interest route
routesApi.interest(apiRouter);

// post route
routesApi.post(apiRouter);

// poll route
routesApi.poll(apiRouter);

// community route
routesApi.community(apiRouter);

// course route
routesApi.course(apiRouter);

apiRouter.post('/community/course', // this route logic is not yet finish with the previous developer
  lib.params,
  handlers.postCommunityCourse.validateParams,
  lib.upload.single,
  handlers.postCommunityCourse.response);

module.exports = app;
