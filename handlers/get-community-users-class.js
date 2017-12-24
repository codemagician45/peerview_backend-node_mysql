'use strict';

/**
 * @author Jo-Ries Canino
 * This route is for getting all the affected
 * or enrolled users in a specified classId
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
  let paramsSchema = {
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
function findUserInUserClass (req, res, next) {
  let courseClassId = req.$params.classId;

  req.db.userClass.findAll({
    attributes: ['userId'],
    where: {
      courseClassId: {
        [req.Op.eq]: courseClassId
      }
    }
  })
  .then(userClass => {
    req.$scope.userIds = userClass;
    next();
    return userClass;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userClass.findAll Error - get-community-users-class');
  });
}

/**
 * Get all the users in the user
 * specified by the array of userIds
 */
function getCommunityUsersClass (req, res, next) { // eslint-disable-line id-length
  let userIds = req.$scope.userIds;
  userIds = userIds.map(userClass => userClass.userId);

  return req.db.user.findAll({
    where: {
      id: {
        [req.Op.in]: [userIds]
      }
    }
  })
  .then(user => {
    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-community-users-class');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let user = req.$scope.user;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    user: user
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.findUserInUserClass = findUserInUserClass;
module.exports.logic = getCommunityUsersClass;
module.exports.response = response;
