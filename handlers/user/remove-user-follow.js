'use strict';

/**
 * @author Jo-Ries Canino
 * @description Unfollow a User
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
    userId: {
      isInt: {
        errorMessage: 'Invalid Resource: User Id'
      }
    }
  };

  req.checkParams(paramsSchema);
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

function removeUserFollow (req, res, next) {
  let user = req.$scope.user;
  let followeeId = req.params.userId;

  return req.db.userFollower.findOne({
    where: {
      [req.Op.and]: {
        followeeId: followeeId,
        followerId: user.id
      }
    }
  })
  .then(userFollower => {
    userFollower.newId = userFollower.id + '_userFollower';
    userFollower.credits = -5;
    req.$scope.userCredits = userFollower;
    req.$scope.userId = followeeId;

    return req.db.userFollower.destroy({
      where: {
        [req.Op.and]: {
          followeeId: followeeId,
          followerId: user.id
        }
      }
    });
  })
  .then(userFollower => {
    next();
    return userFollower;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userFollower.findOne Error - remove-user-follow');
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
module.exports.logic = removeUserFollow;
module.exports.response = response;
