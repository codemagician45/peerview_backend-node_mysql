'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Interest
 */

const lib = require('../lib');

/**
 * This will get the interest category
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getInterestCategory (req, res, next) {
  return req.db.interestCategory.findAll({})
  .then(interestCategory => {
    req.$scope.interestCategory = interestCategory;
    next();
    return interestCategory;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'interestCategory.findAll Error - get-interest-category');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let interestCategory = req.$scope.interestCategory;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: interestCategory
  };

  res.status(200).send(body);
}

module.exports.logic = getInterestCategory;
module.exports.response = response;
