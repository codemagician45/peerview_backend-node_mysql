'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function interestApi (apiRouter) {
  apiRouter.get('/interest/:interestCategoryId',
    lib.params,
    lib.isTokenExist.user,
    handlers.getInterest.validateParams,
    handlers.getInterest.logic,
    handlers.getInterest.response);

  apiRouter.get('/interests', // category interest
    lib.params,
    lib.isTokenExist.user,
    handlers.getInterestsCategory.logic,
    handlers.getInterestsCategory.response);

  apiRouter.post('/interest/:interestCategoryId', // saving of sub-interest
    lib.params,
    lib.isTokenExist.user,
    handlers.postInterest.validateParams,
    handlers.postInterest.logic,
    handlers.postInterest.response);

  apiRouter.delete('/interest/:interestId', // remove of sub-interest
    lib.params,
    lib.isTokenExist.user,
    handlers.removeInterest.validateParams,
    handlers.removeInterest.logic,
    handlers.removeInterest.response);
}

module.exports = interestApi;
