'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Credits
 */

const lib = require('../../lib');

function getUserCredits (req, res, next) {
  let user = req.$scope.user;
  const sequelize = req.db.userCredits.sequelize;

  return req.db.userCredits.findAll({
    attributes: [
      [sequelize.fn('SUM',
        sequelize.col('credits')), 'totalCredits'],
    ],
    where: {
      [req.Op.and]: {
        userId: {
          [req.Op.eq]: user.id,
        },
        //communityId: null? check why we need this
      }
    }
  })
  .then(userCredits => {
    req.$scope.userCredits = userCredits[0];// use for updating credits
    next();
    return userCredits;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userCredits.findAll Error - get-user-credits');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let userCredits = req.$scope.userCredits;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: userCredits
  };

  res.status(200).send(body);
}

module.exports.logic = getUserCredits;
module.exports.response = response;
