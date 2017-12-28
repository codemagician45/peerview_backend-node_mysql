'use strict';

/**
 * @author Jo-Ries Canino
 * @description User follow
 * Basically you are following another user
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

function postUserFollow (req, res, next) {
  let user = req.$scope.user;
  let followeeId = req.params.userId;

  return req.db.userFollower.create({
    followeeId: followeeId,
    followerId: user.id // I am the follower
  })
  .then(userFollower => {
    // use below for credits
    userFollower.newId = userFollower.id + '_userFollower';
    userFollower.credits = 5;
    req.$scope.userCredits = userFollower;
    req.$scope.userId = followeeId;
    next();
    return userFollower;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userFollower.create Error - post-user-follow');
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
module.exports.logic = postUserFollow;
module.exports.response = response;
