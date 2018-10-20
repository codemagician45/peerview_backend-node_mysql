/*eslint-disable max-lines*/
'use strict';

const express = require('express');
const validator = require('express-validator');
const url = require('url');
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
/**
 * Basically this would the referrence of all the api's
 * This would be beneficial when we setup all the needed
 * testing (unit, integration).
 */
apiRouter.use((req, res, next) => {
  /**
   * This will be used as a merge params
   * of the req.query, req.body, and req.params
   * from the request object.
   */
  let query = url.parse(req.url, true).query;
  req.$params = Object.assign(req.params, req.body, query);

  next();
});
app.use('/api/v1', apiRouter);

// basic routes
apiRouter.post('/token/verify', // user for checking token afte the user click reset-password
  lib.params,
  handlers.postTokenVerify.logic,
  handlers.postTokenVerify.response);
// end basic routes

routesApi.user(apiRouter);
// end user route

// interest route
routesApi.interest(apiRouter);

// post route
routesApi.post(apiRouter);

// community route
routesApi.community(apiRouter);

// course route
routesApi.course(apiRouter);

// leisure route
routesApi.leisure(apiRouter);

// campus route
routesApi.campus(apiRouter);

routesApi.message(apiRouter);

routesApi.userV1(apiRouter);

routesApi.postV1(apiRouter);

apiRouter.get('/search', // combination of advance-search/user and advance-search/post
  lib.params,
  lib.isTokenExist.user,
  handlers.getSearch.validateParams,
  handlers.getSearch.getSearchUser,
  handlers.getSearch.getSearchPost,
  handlers.getSearch.logic,
  handlers.getSearch.response);

apiRouter.get('/search/interests',
  lib.params,
  lib.isTokenExist.user,
  handlers.getSearchInterests.validateParams,
  handlers.getSearchInterests.logic,
  handlers.getSearchInterests.response);

apiRouter.get('/cities/:countryCode',
  lib.params,
  lib.isTokenExist.user,
  handlers.getCities.validateParams,
  handlers.getCities.logic,
  handlers.getCities.response);

apiRouter.get('/advance-search/user',
  lib.params,
  lib.isTokenExist.user,
  handlers.getAdvanceSearchUser.validateParams,
  handlers.getAdvanceSearchUser.logic,
  handlers.getAdvanceSearchUser.response);

apiRouter.get('/advance-search/post',
  lib.params,
  lib.isTokenExist.user,
  handlers.getAdvanceSearchPost.validateParams,
  handlers.getAdvanceSearchPost.logic,
  handlers.getAdvanceSearchPost.response);

module.exports = app;
