'use strict';

/**
 * @author Jo-Ries Canino
 * @description Community Post Follow
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
    communityPostId: {
      isInt: {
        errorMessage: 'Invalid Resource: Community Post Id'
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
function postCommunityPostFollow (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let communityPostId = req.$params.communityPostId;

  return req.db.communityPostFollow.create({
    communityPostId: communityPostId,
    userId: user.id
  })
  .then(communityPostFollow => {
    next();
    return communityPostFollow;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPostFollow.create Error - post-community-post-follow');
  });
}

function saveCommunityPostFollowCronQueue (req, res, next) {// eslint-disable-line id-length
  let communityPostId = req.$params.communityPostId;
  return req.db.communityPostFollowCronQueue.create({
    communityPostId: communityPostId
  })
  .then(communityPostFollowCronQueue => {// eslint-disable-line id-length
    next();
    communityPostFollowCronQueue;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPostFollowCronQueue.create Error - post-community-post-follow');
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
module.exports.logic = postCommunityPostFollow;
module.exports.saveCommunityPostFollowCronQueue = saveCommunityPostFollowCronQueue;
module.exports.response = response;
