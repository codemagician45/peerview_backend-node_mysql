'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update Community Course Classes
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
    courseId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Course Id'
      }
    },
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Name'
      }
    }
  };

  let paramsSchema = {
    classId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Class Id Params'
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
  req.checkParams(paramsSchema);
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
 * @see {@link lib/isCommunityTokenExist}
 * @see isCommunityTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateCommunityCourseClass (req, res, next) {// eslint-disable-line id-length
  let community = req.$scope.community;
  let courseId = req.$params.courseId;
  let name = req.$params.name;
  let classId = req.$params.classId;

  return req.db.courseClass.update({
    courseId: courseId,
    name: name
  }, {
    where: {
      [req.Op.and]: {
        universityId: community.id,
        id: classId
      }
    }
  })
  .then(courseClass => {
    next();
    return courseClass;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'courseClass.update Error - update-community-course-class');
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
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = updateCommunityCourseClass;
module.exports.response = response;
