'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Study Levels
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
function getUserStudyLevels (req, res, next) {
  return req.db.userStudyLevel.findAll({})
  .then(userStudyLevels => {
    req.$scope.userStudyLevels = userStudyLevels;
    next();
    return userStudyLevels;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userStudyLevel.findAll Error - get-user-study-levels');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let userStudyLevels = req.$scope.userStudyLevels;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: userStudyLevels
  };

  res.status(200).send(body);
}

module.exports.logic = getUserStudyLevels;
module.exports.response = response;
