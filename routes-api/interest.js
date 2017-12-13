'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function interestApi (apiRouter) {
  apiRouter.get('/interest',
    lib.params,
    handlers.getInterest.validateParams,
    handlers.getInterest.logic,
    handlers.getInterest.response);

  apiRouter.get('/interest/category',
    handlers.getInterestCategory.logic,
    handlers.getInterestCategory.response);
}

module.exports = interestApi;
