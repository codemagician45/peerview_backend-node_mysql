'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Follower
 * Basically you are being followed
 */

const lib = require('../../lib');

/**
 * This will get the interest or sub-interest in the
 * current context provided the interestCategoryId
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getUserFollower (req, res, next) {
  let user = req.$scope.user;

  return req.db.userFollower.findAll({
    include: [{
      model: req.db.user,
      as: 'follower'
    }],
    where: {
      followerId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(follower => {
    req.$scope.follower = follower;
    next();
    return follower;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userFollower.findAll Error - get-user-follower');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let follower = req.$scope.follower;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    follower: follower
  };

  res.status(200).send(body);
}

module.exports.logic = getUserFollower;
module.exports.response = response;
