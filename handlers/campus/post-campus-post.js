'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Campus
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
    },
    courseId: {// use in the course feed
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Course Id'
      }
    },
    freshersFeedId: {// use in the freshers feed
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Freshers Feed Id'
      }
    },
    classId: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Course Class Id'
      }
    },
    clubId: {// use in society-club
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Society Club Id'
      }
    }
  };

  let bodySchema = {
    message: {// this will be used as a jsonData for brainstorming
      notEmpty: {
        errorMessage: 'Missing Resource: Message'
      }
    }
  };

  req.checkParams(paramsSchema);
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

function postCampusPost (req, res, next) {
  let user = req.$scope.user;
  let message = req.$params.message;
  let campusId = req.$params.campusId;
  let courseId = req.$params.courseId;
  let freshersFeedId = req.$params.freshersFeedId;
  let campusCourseClassId = req.$params.classId;
  let campusSocietyClubId = req.$params.clubId;

  return req.db.campusPost.create({
    userId: user.id,
    campusId: campusId,
    courseId: courseId,
    campusFreshersFeedId: freshersFeedId,
    campusCourseClassId: campusCourseClassId,
    campusSocietyClubId: campusSocietyClubId,
    message: message
  })
  .then(campusPost => {
    next();
    return campusPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPost.create Error - post-campus-post');
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
module.exports.logic = postCampusPost;
module.exports.response = response;
