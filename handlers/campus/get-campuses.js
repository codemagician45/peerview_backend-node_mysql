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
function getCampuses (req, res, next) {
  return req.db.campus.findAll({
    where: {
      status: {
        [req.Op.eq]: 1
      }
    }
  })
  .then(campuses => {
    req.$scope.campuses = campuses;
    next();
    return campuses;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campus.findAll Error - get-campuses');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campuses = req.$scope.campuses;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campuses
  };

  res.status(200)
  .send(body);
}

module.exports.logic = getCampuses;
module.exports.response = response;
