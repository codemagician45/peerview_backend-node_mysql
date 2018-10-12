'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Follower
 * Basically you are being followed
 */

const lib = require('../../lib');

function getUserFollower (req, res, next) {
  let userId = req.$params.userId || req.$scope.user.id;

  return req.db.userFollower.findAll({
    include: [{
      model: req.db.user,
      as: 'follower'
    }],
    where: {
      followeeId: {
        [req.Op.eq]: userId
      }
    }
  })
  .then(followers => {
    req.$scope.followers = followers;
    next();
    return followers;
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
  let followers = req.$scope.followers;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: followers
  };

  res.status(200).send(body);
}

module.exports.logic = getUserFollower;
module.exports.response = response;
