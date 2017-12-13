'use strict';

/**
 * @author Jo-Ries Canino
 * @description Community Post
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
    userTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Type Id'
      }
    },
    courseId: {// this thing will be used for post in which courseId or general section
      optional: true
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

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkBody(bodySchema);
  req.headerSchema(headerSchema);
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
function postCommunityPost (req, res, next) {
  let user = req.$scoper.user;
  let userTypeId = req.$params.userTypeId;
  let courseId = req.$params.courseId;

  return req.db.communityPost.create({
    userId: user.id,
    userTypeId: userTypeId,
    courseId: courseId
  })
  .then(communityPost => {
    req.$scope.communityPost = communityPost;
    next();
    return communityPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'communityPost.create Error - post-community-post');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let communityPost = req.$scope.communityPost;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    communityPost: communityPost
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCommunityPost;
module.exports.response = response;
