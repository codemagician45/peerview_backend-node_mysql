'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Share Post
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
    sharePostId: {
      isInt: {
        errorMessage: 'Invalid Resource: Share Post Id'
      }
    }
  };

  let bodySchema = {
    message: {
      notEmpty: {
        errorMessage: 'Missing Resource: Message'
      },
      isLength: {
        options: [{
          min: 1,
          max: 280
        }],
        errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
      }
    }
  };

  req.checkParams(paramsSchema);
  req.checkBody(bodySchema);
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
function postSharePost (req, res, next) {
  let user = req.$scope.user;
  let sharePostId = req.$params.sharePostId;
  let message = req.$params.message;

  return req.db.post.create({
    userId: user.id,
    sharePostId: sharePostId,
    message: message
  })
  .then(post => {
    post.dataValues.user = user.dataValues;
    next();
    return post;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.create Error - post-post');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let post = req.$scope.post;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    data: post
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postSharePost;
module.exports.response = response;
