'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Type Details
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
    courseId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Course Id'
      }
    },
    userStudyLevelId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Study level Id'
      }
    },
    userTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Type Id'
      }
    },
    schoolName: {
      notEmpty: {
        errorMessage: 'Missing Resource: School Name'
      }
    },
    currentCity: {
      notEmpty: {
        errorMessage: 'Missing Resource: Current City'
      }
    },
    gender: {
      notEmpty: {
        errorMessage: 'Missing Resource: Gender'
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
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postUserTypeDetails (req, res, next) {
  let courseId = req.$params.courseId;
  let userStudyLevelId = req.$params.userStudyLevelId;
  let userTypeId = req.$params.userTypeId;
  let schoolName = req.$params.schoolName;
  let city = req.$params.currentCity;
  let gender = req.$params.gender;

  return req.db.userTypeDetails.create({
    courseId: courseId,
    userStudyLevelId: userStudyLevelId,
    userTypeId: userTypeId,
    schoolName: schoolName,
    city: city,
    gender: gender
  })
  .then(userTypeDetails => {
    next();
    return userTypeDetails;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'userTypeDetails.create Error - post-user-type-details');
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
module.exports.logic = postUserTypeDetails;
module.exports.response = response;
