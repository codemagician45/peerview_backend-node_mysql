'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Story
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
  let bodySchema = {
    postCategoryId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Post Category Id'
      },
      isInt: {
        errorMessage: 'Invalid Resource: Post Category Id'
      }
    },
    title: {
      notEmpty: {
        errorMessage: 'Missing Resource: Title'
      }
    },
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
 * In which if the user is still unverified
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postStory (req, res, next) {
  let user = req.$scope.user;
  let postCategoryId = req.$params.postCategoryId;
  let title = req.$params.title;
  let message = req.$params.message;

  return req.db.post.create({
    userId: user.id,
    postCategoryId: postCategoryId,
    title: title,
    message: message
  })
  .then(post => {
    next();
    return post;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
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
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postStory;
module.exports.response = response;