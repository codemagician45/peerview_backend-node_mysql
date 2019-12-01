'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function jobApi (apiRouter) {
  apiRouter.get('/jobs',
    lib.params,
    lib.isTokenExist.user,
    handlers.job.getJobs.validateParams,
    handlers.job.getJobs.logic,
    handlers.job.getJobs.response);
  
  apiRouter.get('/jobs/user-jobs',
    lib.params,
    lib.isTokenExist.user,
    handlers.job.getUserJobs.validateParams,
    handlers.job.getUserJobs.logic,
    handlers.job.getUserJobs.response);

  apiRouter.get('/job/:jobId',
    lib.params,
    lib.isTokenExist.user,
    handlers.job.getJob.validateParams,
    handlers.job.getJob.logic,
    handlers.job.getJob.response);

  apiRouter.post('/job',
    lib.params,
    lib.isTokenExist.user,
    handlers.job.postJob.validateParams,
    handlers.job.postJob.logic,
    handlers.job.postJob.response);
}

module.exports = jobApi;
