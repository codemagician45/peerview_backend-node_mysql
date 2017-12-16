'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function courseApi (apiRouter) {
  apiRouter.get('/courses',
    lib.params,
    handlers.course.getCourses.validateParams,
    handlers.course.getCourses.getCourses,
    handlers.course.getCourses.response);
}

module.exports = courseApi;
