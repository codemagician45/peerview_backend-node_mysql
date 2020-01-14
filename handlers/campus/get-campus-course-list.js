'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Campus Courses
 */

const lib = require('../../lib');

/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function validateParams (req, res, next) {
  let paramsSchema = {
    campusId: {
      isInt: {
        errorMessage: 'Invalid Resource: Campus Id'
      }
    }
  };

  req.checkParams(paramsSchema);
  return req.getValidationResult()
  .then(validationErrors => {
    if (validationErrors.array().length !== 0) {
      return res.status(400)
      .send(new lib.rpc.ValidationError(validationErrors.array()));
    }

    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));
  });
}

function getCampusCourseList (req, res, next) {// eslint-disable-line id-length
  let campusId = req.$params.campusId;

  return req.db.campusCourse.findAll({
    include: [{
      model: req.db.course
    }],
    where: {
      campusId: {
        [req.Op.eq]: campusId
      }
    }
  })
  .then(campusCourseList => {
    req.$scope.campusCourseList = campusCourseList;
    next();
    return campusCourseList;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusCourse.findAll Error - get-campus-course-list');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusCourseList = req.$scope.campusCourseList;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campusCourseList
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusCourseList;
module.exports.response = response;
