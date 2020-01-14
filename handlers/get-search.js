'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Results in search query
 */

const lib = require('../lib');
const _ = require('lodash');

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
    searchString: {
      notEmpty: {
        errorMessage: 'Missing Resource: Search String'
      }
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

function getSearchUser (req, res, next) {
  let searchString = req.$params.searchString;
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
          [req.Op.like]: `%${searchString}%`
        }
      }, {
        '$campus.name$': {
          [req.Op.like]: `%${searchString}%`
        }
      }]
    },
    order: [['updatedAt', 'DESC']],
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(userSearchResults => {
    req.$scope.userSearchResults = userSearchResults;
    next();
    return userSearchResults;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-search');
  });
}

function getSearchPost (req, res, next) {
  let searchString = req.$params.searchString;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  return req.db.post.findAll({
    where: {
      [req.Op.or]: [{
        message: {
          [req.Op.like]: `%${searchString}%`
        }
      }, {
        title: {
          [req.Op.like]: `%${searchString}%`
        }
      }]
    },
    order: [['createdAt', 'ASC']],
    offset: !offset ? 0 : offset,
    limit: !limit ? 10 : limit
  })
  .then(postSearchResults => {
    req.$scope.postSearchResults = postSearchResults;
    next();
    return postSearchResults;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-advance-search-post');
  });
}

function getSearch (req, res, next) {
  let userSearchResults = req.$scope.userSearchResults;
  let postSearchResults = req.$scope.postSearchResults;

  let searchResults = userSearchResults.concat(postSearchResults);
  // sort the 2 data by createdAt
  searchResults = _.orderBy(searchResults, ['createdAt'], ['desc']);
  req.$scope.searchResults = searchResults;
  next();
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
module.exports.getSearchUser = getSearchUser;
module.exports.getSearchPost = getSearchPost;
module.exports.logic = getSearch;
module.exports.response = response;
