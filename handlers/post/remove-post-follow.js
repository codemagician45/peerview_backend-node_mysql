'use strict';

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
    courseId: {
      isInt: {
        errorMessage: 'Invalid Resource: Course Id'
      }
    },
    postId: {
      isInt: {
        errorMessage: 'Invalid Resource: Post Id'
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
function removePostFollow (req, res, next) {
  let user = req.$scope.user;
  let courseId = req.$params.courseId;
  let postId = req.$params.postId;

  return req.db.followPost.destroy({
    where: {
      [req.Op.and]: {
        courseId: {
          [req.Op.eq]: courseId
        },
        postV1Id: {
          [req.Op.eq]: postId
        },
        userId: {
          [req.Op.eq]: user.id
        }
      }
    }
  })
  .then(postLike => {
    next();
    return postLike;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postFollow.destroy Error - remove-post-follow');
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
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = removePostFollow;
module.exports.response = response;