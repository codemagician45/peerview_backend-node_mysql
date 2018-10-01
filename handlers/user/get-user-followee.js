'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Followee/Following
 * Basically you are the follower of a given user
 */

const lib = require('../../lib');

function getUserFollowee (req, res, next) {
  let user = req.$scope.user;

  return req.db.userFollower.findAll({
    include: [{
      model: req.db.user,
      as: 'follower'
    }],
    where: {
      followeeId: {
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
  let follower = req.$scope.follower;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: follower
  };

  res.status(200).send(body);
}

module.exports.logic = getUserFollowee;
module.exports.response = response;
