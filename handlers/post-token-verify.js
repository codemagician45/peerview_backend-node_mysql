'use strict';

/**
 * @author Jo-Ries Canino
 * @description Token Verification
 */

const moment = require('moment');
const lib = require('../lib');

/**
 * Check if the token is already expired
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postTokenVerify (req, res, next) {
  let token = req.headers.token;

  return req.db.user.findOne({
    where: {
      [req.Op.and]: {
        token: token,
        tokenActiveDate: {
          [req.Op.gte]: moment(new Date())
        }
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Invalid Resource: Token Expired',
        http_code: 400
      });
    }

    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findOne Error - post-token-verify');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.logic = postTokenVerify;
module.exports.response = response;
