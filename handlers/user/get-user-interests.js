'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Interest
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
function getUserInterests (req, res, next) {
  let user = req.$scope.user;

  return req.db.userInterest.findAll({
    include: [{
      model: req.db.interest,
    }],
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(interests => {
    req.$scope.interests = interests;
    next();
    return interests;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'interest.findAll Error - get-user-interests');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let interests = req.$scope.interests;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: interests
  };

  res.status(200).send(body);
}

module.exports.logic = getUserInterests;
module.exports.response = response;
