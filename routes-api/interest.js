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

  apiRouter.get('/interest',
    lib.params,
    lib.isTokenExist.user,
    handlers.getInterestCategory.logic,
    handlers.getInterestCategory.response);
}

module.exports = interestApi;
