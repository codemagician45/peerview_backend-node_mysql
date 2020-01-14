'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Results in search query
 */

const lib = require('../lib');

/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function validateParams (req, res, next) {
  let paramsSchema = {
    lastName: {
      optional: true
    },
    campusName: {
      optinal: true
    },
    limit: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Limit'
      }
    },
    offset: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Offset'
      }
    }
  };

  req.checkParams(paramsSchema);
  return req.getValidationResult()
  .then(validationErrors => {
    if (validationErrors.array().length !== 0) {
      return res.status(400)
      .send(new lib.rpc.ValidationError(validationErrors.array()));
    }

    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));
  });
}

function getAdvanceSearchUser (req, res, next) {
  let lastName = req.$params.lastName;
  let campusName = req.$params.campusName;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  return req.db.user.findAll({
    include: [{
      model: req.db.campus,
      as: 'campus',
      attributes: []
    }],
    where: {
      [req.Op.or]: [{
        lastName: {
          [req.Op.like]: `%${lastName}%`
        }
      }, {
        '$campus.name$': {
          [req.Op.like]: `%${campusName}%`
        }
      }]
    },
    order: [['createdAt', 'ASC']],
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(searchResults => {
    req.$scope.searchResults = searchResults;
    next();
    return searchResults;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-search');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let searchResults = req.$scope.searchResults;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: searchResults
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getAdvanceSearchUser;
module.exports.response = response;
