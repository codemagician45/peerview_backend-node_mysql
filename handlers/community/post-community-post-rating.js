'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Rating
 */

const lib = require('../../lib/rpc');

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
    communityPostId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Community Post Id'
      }
    },
    rating: {
      notEmpty: {
        errorMessage: 'Missing Resource: Rating'
      }
    }
  };

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkBody(bodySchema);
  req.checkHeaders(headerSchema);
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
function postCommunityPostRating (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let postId = req.$params.postId;
  let rating = req.$params.rating;

  return req.db.communityPostRating.create({
    postId: postId,
    userId: user.id,
    rating: rating
  })
  .then(communityPostRating => {
    req.$scope.communityPostRating = communityPostRating;
    next();
    return communityPostRating;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'postRating.create Error - post-community-post-rating');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let communityPostRating = req.$scope.communityPostRating;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    communityPostRating: communityPostRating
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCommunityPostRating;
module.exports.response = response;
