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
    keyword: {
      notEmpty: {
        errorMessage: 'Missing Resource: Keyword'
      }
    },
    limit: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Offset'
      }
    },
    offset: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Limit'
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

function getAdvanceSearchPost (req, res, next) {
  let keyword = req.$params.keyword;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  return req.db.post.findAll({
    where: {
      [req.Op.or]: [{
        message: {
          [req.Op.like]: `%${keyword}%`
        }
      }, {
        title: {
          [req.Op.like]: `%${keyword}%`
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
    }, 'user.findAll Error - get-advance-search-post');
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
module.exports.logic = getAdvanceSearchPost;
module.exports.response = response;
