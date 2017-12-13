'use strict';

/**
 * @author Jo-Ries Canino
 * @description User Followers
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
    followeeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: followee Id Params'
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

function getUserFollowersFollowee (req, res, next) {// eslint-disable-line id-length
  let followeeId = req.$params.followeeId;

  return req.db.follow.findAll({
    include: [{
      model: req.db.user,
      as: 'followee'
    }],
    where: {
      followeeId: {
        [req.Op.eq]: followeeId
      }
    }
  })
  .then(follow => {
    next();
    return follow;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'follow.findAll Error - get-user-followers-followee');
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
module.exports.logic = getUserFollowersFollowee;
module.exports.response = response;
