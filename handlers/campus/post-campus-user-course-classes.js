'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Course Class
 * This would be saving of the user classes
 * within his/her campus.
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
  let bodySchema = {
    campusCourseClassIds: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Campus Course Class Ids'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Campus Course Class Ids'
      }
    }
  };

  req.checkBody(bodySchema);
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

function postCampusUserCourseClasses (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusCourseClassIds = req.$params.campusCourseClassIds;
  let userClasses = [];

  campusCourseClassIds.forEach(campusCourseClassId => {
    userClasses.push({
      userId: user.id,
      campusCourseClassId: campusCourseClassId
    });
  });

  return req.db.campusUserCourseClass.bulkCreate(userClasses)
  .then(campusUserCourseClass => {// eslint-disable-line id-length
    next();
    return campusUserCourseClass;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusUserCourseClass.bulkCreate Error - post-campus-user-course-classes');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCampusUserCourseClasses;
module.exports.response = response;
