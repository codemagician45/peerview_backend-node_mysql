'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Post Category Id
 * Basically Right now we have 2 Categories
 * post
 * story
 */

const lib = require('../../lib');

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
    categoryCode: {
      notEmpty: {
        errorMessage: 'Missing Resource: Category Code'
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

/**
 * This would be the fallback if the user existed
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function getPostCategoryId (req, res, next) {
  let categoryCode = req.$params.categoryCode;

  return req.db.postCategory.findOne({
    where: {
      code: {
        [req.Op.eq]: categoryCode
      }
    }
  })
  .then(postCategory => {
    if (!postCategory) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Invalid Resource: Post Category Code',
        http_code: 400
      });
    }

    req.$scope.postCategory = postCategory;
    next();
    return postCategory;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postRating.findAll Error - get-post-category-id');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let postCategory = req.$scope.postCategory;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: postCategory.id
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getPostCategoryId;
module.exports.response = response;
