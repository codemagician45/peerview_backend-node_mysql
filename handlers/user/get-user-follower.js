'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Follower
 * Basically you are being followed
 */

const lib = require('../../lib');

function getUserFollower (req, res, next) {
  let user = req.$scope.user;

  return req.db.userFollower.findAll({
    include: [{
      model: req.db.user,
      as: 'followee'
    }],
    where: {
      followerId: {
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
  let followee = req.$scope.followee;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: followee
  };

  res.status(200).send(body);
}

module.exports.logic = getUserFollower;
module.exports.response = response;
