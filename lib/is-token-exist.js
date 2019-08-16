'use strict';

/**
 * This act as a middleware to check if
 * the token is valid or exist
 * @author Jo-Ries Canino
 */

const rpc = require('./rpc');
const moment = require('moment');

/**
 * Check if the user token is valid or exist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function isUserTokenExist (req, res, next) {
  let token = req.headers.token;
  const sequelize = req.db.userCredits.sequelize;
  if (!token) {
    return res.status(400).send({
      status: 'ERROR',
      status_code: 101,
      status_message: 'Missing Resource: Token',
      http_code: 400
    });
  }

  
  return req.db.user.findOne({
    include: [{
      model: req.db.userCredits,
      attributes: [
        [sequelize.fn('SUM',
          sequelize.col('credits')), 'totalCredits'],
      ],
    }],
    where: {
      token: {
        [req.Op.eq]: token
      }
    }
  })
  .then(user => {

    if (!user || !user.id) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Invalid Resource: Token',
        http_code: 400
      });
    }

    let currentDate = moment();
    user.last_logging_time = currentDate;
    user.save().then(
      user => {
        console.log('log time updated');
      }
    )
    .catch(error => {
      console.log('log time update: ', error);
    });

    req.$scope.user = user;
    next();
    /**
     * This would a return coming from the top then
     * so that we can eliminate this error
     * http://goo.gl/rRqMUw
     */
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - is-token-exist');
  });
}


/**
 * Check if the community token is valid or exist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function isCommunityTokenExist (req, res, next) {// eslint-disable-line id-length
  let token = req.headers.token;

  return req.db.community.findOne({
    where: {
      token: {
        [req.Op.eq]: token
      }
    }
  })
  .then(community => {
    if (!community) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Invalid Token',
        http_code: 400
      });
    }

    req.$scope.community = community;
    next();
    /**
     * This would a return coming from the top then
     * so that we can eliminate this error
     * http://goo.gl/rRqMUw
     */
    return community;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'community.findOne Error - is-token-exist');
  });
}

module.exports.user = isUserTokenExist;
module.exports.communityUser = isCommunityTokenExist;
