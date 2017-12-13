'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get all courses
 */

const rpc = require('../lib/rpc');

/**
 * Get all the courses
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getCourses (req, res, next) {
  return req.db.course.findAll({})
  .then(courses => {
    req.$scope.courses = courses;
    next();
    return courses;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'course.findAll Error - get-courses');
  });
}

/**
 * Get all the interest
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getInterestCategory (req, res, next) {
  return req.db.interest.findAll({
    include: [{
      model: req.db.interestcategory
    }]
  })
  .then(interest => {
    req.$scope.interest = interest;
    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'interestcategory.findAll Error - get-courses');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let courses = req.$scope.courses;
  // let interest = req.$scope.interest;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    courses: courses
    // interest: interest
  };

  res.status(200)
  .send(body);
}

module.exports.getCourses = getCourses;
module.exports.getInterestCategory = getInterestCategory;
module.exports.response = response;
