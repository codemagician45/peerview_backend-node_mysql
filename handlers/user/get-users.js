'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Users
 */

const lib = require('../../lib');

function getUsers (req, res, next) {
  return req.db.user.findAll({})
  .then(users => {
    req.$scope.users = users;

    next();
    return users;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-users');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let users = req.$scope.users;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: users
  };

  res.status(200).send(body);
}

module.exports.logic = getUsers;
module.exports.response = response;
