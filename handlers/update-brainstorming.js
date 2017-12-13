'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update brainstorming
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
    topicName: {
      notEmpty: {
        errorMessage: 'Missing Resource: Topic Name'
      }
    },
    courseId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Course Id'
      }
    },
    classId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Class Id'
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
 * This would be the fallback if the token exist
 * @see {@link lib/isTokenExist}
 * @see isTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateBrainstorming (req, res, next) {
  let user = req.$params.user;
  let topicName = req.$params.topicName;
  let courseId = req.$params.courseId;
  let classId = req.$params.classId;

  return req.db.brainstorming.update({
    topicName: topicName,
    courseId: courseId,
    classId: classId
  }, {
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(brainstorming => {
    next();
    return brainstorming;
  });
}

module.exports.validateParams = validateParams;
module.exports.logic = updateBrainstorming;
