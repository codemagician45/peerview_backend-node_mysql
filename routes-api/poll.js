'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function pollApi (apiRouter) {
  apiRouter.post('/poll',
    lib.params,
    handlers.poll.postPoll.validateParams,
    lib.isTokenExist.user,
    handlers.poll.postPoll.logic,
    handlers.poll.postPoll.savePollOption,
    handlers.poll.postPoll.response);
}

module.exports = pollApi;
