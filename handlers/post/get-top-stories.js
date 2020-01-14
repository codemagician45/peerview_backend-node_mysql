'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Top Stories
 */

const lib = require('../../lib');

/**
 * This would be the fallback if the user existed
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */

function getUserInterests (req, res, next) {
  // get the user interest
  let user = req.$scope.user;
  return req.userInterest.findAll({
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(userInterests => {
    req.$scope.userInterests = userInterests;
    next();
    return userInterests;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userInterest.findAll Error - get-top-stories');
  });
}

function getTopStories (req, res, next) {
  next();
  // let user = req.$scope.user;
  // let userInterests = req.$scope.userInterests;
}

module.exports.getUserInterests = getUserInterests;
module.exports.getTopStories = getTopStories;