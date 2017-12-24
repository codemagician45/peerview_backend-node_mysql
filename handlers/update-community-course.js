'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update Community Course
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
        errorMessage: 'Missing Resource: Course Type'
      }
    },
    universityId: {
      notEmpty: {
        errorMessage: 'Missing Resource: University Id'
      }
    }
  };

  let paramsSchema = {
    courseId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Course Id Params'
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
function updateCommunityCourse (req, res, next) {// eslint-disable-line id-length
  let name = req.$params.name;
  let description = req.$params.description;
  let image = req.file ? req.file.filename : null;
  let courseTypeId = req.$params.courseTypeId;
  let courseId = req.$params.courseId;

  return req.db.course.update({
    name: name,
    description: description,
    image: image,
    courseTypeId: courseTypeId,
  }, {
    where: {
      id: {
        [req.Op.eq]: courseId
      }
    }
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
    }, 'course.update Error - update-community-course');
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
module.exports.logic = updateCommunityCourse;
module.exports.response = response;
