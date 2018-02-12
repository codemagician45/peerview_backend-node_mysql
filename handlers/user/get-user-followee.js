'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Followee/Following
 * Basically you are the follower of a given user
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
function getUserFollowee (req, res, next) {
  let user = req.$scope.user;

  return req.db.userFollower.findAll({
    include: [{
      model: req.db.user,
      as: 'followee'
    }],
    where: {
      followeeId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(followee => {
    req.$scope.followee = followee;
    next();
    return followee;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userFollower.findAll Error - get-user-followee');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let followee = req.$scope.followee;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    followee: followee
  };

  res.status(200).send(body);
}

module.exports.logic = getUserFollowee;
module.exports.response = response;
