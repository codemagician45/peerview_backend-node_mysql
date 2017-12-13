'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get all or search community courses
 */

const rpc = require('../lib/rpc');

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
    courseTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Course Type Id'
      }
    },
    searchString: {
      notEmpty: {
        errorMessage: 'Missing Resource: Search String'
      }
    }
  };

  let paramsSchema = {
    communityId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Community Id'
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
      .send(new rpc.ValidationError(validationErrors.array()));
    }

    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));
  });
}

/**
 * Get the list of courses based on the
 * searchString param ('all' | anytext)
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getCommunityCourse (req, res, next) {
  let searchString = req.$params.searchString;
  let communityId = req.$params.communityId;
  let courseTypeId = req.$params.courseTypeId;
  let where = {};

  if (searchString !== 'all') {
    where = {
      [req.Op.and]: {
        universityId: communityId, // check why param.communityId is equal to universityId
        courseTypeId: courseTypeId,
        name: {
          [req.Op.like]: `${searchString}%`
        }
      }
    };
  } else {
    where = {
      [req.Op.and]: {
        universityId: communityId, // check whey param.communityId is equal to universityId
        courseTypeId: courseTypeId
      }
    };
  }

  return req.db.course.findAll(where)
  .then(course => {
    next();
    return course;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'course.findAll Error - get-community-course');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let users = req.$scope.users;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    users: users
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCommunityCourse;
module.exports.response = response;
