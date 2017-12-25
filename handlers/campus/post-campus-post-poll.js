'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Campus Poll
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
    question: {
      notEmpty: {
        errorMessage: 'Missing Resource: Question'
      }
    },
    options: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Options'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Options'
      }
    },
    duration: {
      notEmpty: {
        errorMessage: 'Missing Resource: Duration'
      },
      isInt: {
        errorMessage: 'Invalid Resource: Duration'
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

/**
 * This would be the fallback if the user existed
 * In which if the user is still unverified
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postCampusPostPoll (req, res, next) {
  let user = req.$scope.user;
  let campusId = req.$params.campusId;
  let courseId = req.$params.courseId;
  let freshersFeedId = req.$params.freshersFeedId;
  let campusCourseClassId = req.$params.classId;
  let campusSocietyClub = req.$params.clubId;
  let question = req.$params.question;
  let duration = req.$params.duration;

  return req.db.campusPostPoll.create({
    userId: user.id,
    campusId: campusId,
    courseId: courseId,
    campusFreshersFeedId: freshersFeedId,
    campusCourseClassId: campusCourseClassId,
    campusSocietyClub: campusSocietyClub,
    question: question,
    duration: duration
  })
  .then(campusPostPoll => {
    req.$scope.campusPostPoll = campusPostPoll;
    next();
    return campusPostPoll;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPostPoll.create Error - post-campus-post-poll');
  });
}

/**
 * Save the options in the pollOption table
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function saveCampusPostPollOption (req, res, next) {// eslint-disable-line id-length
  let campusPostPoll = req.$scope.campusPostPoll;
  let options = req.$params.options;
  let campusPostPollOption = [];

  options.forEach(option => {
    campusPostPollOption.push({
      name: option,
      campusPollId: campusPostPoll.id
    });
  });

  return req.db.campusPostPollOption.bulkCreate(campusPostPollOption)
  .then(campusPostPollOption => {
    next();
    return campusPostPollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPostPollOption.create Error - post-campus-post-poll');
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
module.exports.logic = postCampusPostPoll;
module.exports.saveCampusPostPollOption = saveCampusPostPollOption;
module.exports.response = response;
