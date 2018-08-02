'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of student user course classes
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
        errorMessage: 'Missing Resource: Campus Id'
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

function getCampusUserCourseClasses (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusId = req.$params.campusId;

  return req.db.campusUserCourseClass.findAll({
    attributes: {
      exclude: ['campusCourseClassId']
    },
    include: [{
      model: req.db.campusCourseClass,
      attributes: ['id', 'name'],
      include: [{
        model: req.db.campusCourse,
        attributes: [],
        where: {
          campusId: {
            [req.Op.eq]: campusId
          }
        }
      }]
    }],
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(campusUserCourseClasses => {// eslint-disable-line id-length
    req.$scope.campusUserCourseClasses = campusUserCourseClasses;
    next();
    return campusUserCourseClasses;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusUserCourseClass.findAll Error - get-campus-user-course-classes');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusUserCourseClasses = req.$scope.campusUserCourseClasses; // eslint-disable-line id-length
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campusUserCourseClasses
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusUserCourseClasses;
module.exports.response = response;
