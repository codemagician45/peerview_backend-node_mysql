'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User
 */

const lib = require('../../lib');
const moment = require('moment');
/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */


function getOfflineUsersTimeline (req, res, next) {
  // var currentDate = new Date();
  // var pastDate = currentDate.setHours(currentDate.getHours() - 72); // get the 3 days back date
  // const sequelize = req.db.postv1.sequelize;

  // const Op = req.db.postv1.sequelize.Op;
  return req.db.user.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'last_logging_time'],
    where: {
      last_logging_time: {
        [req.Op.between]: ['2019-07-26', '2019-07-30'],
      }},
    limit: 5,
    // offset: !offset ? 0 : parseInt(offset),
    // limit: !limit ? 10 : parseInt(limit)
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
    }, 'user.findAll Error - getOfflineUsers');
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
    date: moment(),
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: user
  };

  res.status(200).send(body);
}

module.exports.logic = getOfflineUsersTimeline;
module.exports.response = response;
