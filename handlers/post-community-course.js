'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Community Course
 */

const lib = require('../lib');

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
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Name'
      }
    },
    description: {
      notEmpty: {
        errorMessage: 'Missing Resource: Description'
      }
    },
    courseTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Course Type Id'
      }
    },
    universityId: {
      notEmpty: {
        errorMessage: 'Missing Resource: University Id'
      }
    }
  };

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkBody(bodySchema);
  req.checkHeaders(headerSchema);
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
 * This thing doesn't have the description
 * because this route seems not yet finish
 * by the recent developer
 */
function postCommunityCourse (req, res, next) {// eslint-disable-line id-length
  let name = req.$params.name;
  let description = req.$params.description;
  let courseTypeId = req.$params.courseTypeId;
  let universityId = req.$params.universityId;

  return req.db.course.create({
    name: name,
    description: description,
    courseTypeId: courseTypeId,
    universityId: universityId
  })
  .then(course => {
    next();
    return course;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'course.create Error - post-community-course');
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

  res.status(201)
  .send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCommunityCourse;
module.exports.response = response;
