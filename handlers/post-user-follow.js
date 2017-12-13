'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Follow
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
    followee: {
      notEmpty: {
        errorMessage: 'Missing Resource: Followee'
      }
    }
  };

  req.checkBody(bodySchema);
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
function postUserFollow (req, res, next) {
  let follower = req.$params.user.id;
  let followee = req.$params.followee;

  return req.db.follow.create({
    follower: follower,
    followee: followee
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
    }, 'follow.create Error - post-user-follow');
  });
}

function findFolloweeDetails (req, res, next) {
  let followee = req.$params.followee;

  return req.db.user.findOne({
    where: {
      id: {
        [req.Op.eq]: followee
      }
    }
  })
  .then(user => {
    req.$scope.followee = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - post-user-follow');
  });
}
