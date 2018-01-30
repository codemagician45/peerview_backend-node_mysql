'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Profile of the current login User
 */

const lib = require('../../lib');

function getUserProfile (req, res, next) {
  let user = req.$scope.user;

  return req.db.user.findOne({
    where: {
      id: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(user => {
    req.$scope.user = user;

    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-user');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let user = req.$scope.user;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    user: user
  };

  res.status(200).send(body);
}

module.exports.logic = getUserProfile;
module.exports.response = response;
