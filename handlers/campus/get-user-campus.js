'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get all courses
 * Ideally in the onboarding process
 */

const lib = require('../../lib');

/**
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getUserCampus (req, res, next) {
  let user = req.$scope.user;

  return req.db.campusUser.findOne({
    where: {
        userId: {
            [req.Op.eq]: user.id
        },
        emailVerified: {
            [req.Op.eq]: 1
        }
    },
    include: {
        model: req.db.campus
    }
  })
  .then(userCampus => {
    req.$scope.userCampus = userCampus;
    next();
    return userCampus;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user campus Error - get-user campus');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let userCampus = req.$scope.userCampus;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: userCampus
  };

  res.status(200)
  .send(body);
}

module.exports.logic = getUserCampus;
module.exports.response = response;
