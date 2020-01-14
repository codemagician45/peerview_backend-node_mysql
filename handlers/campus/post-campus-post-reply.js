'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Campus Post Reply
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
    postId: {
      isInt: {
        errorMessage: 'Invalid Resource: Campus Post Id'
      }
    }
  };

  let bodySchema = {
    comment: {
      notEmpty: {
        errorMessage: 'Missing Resource: Comment'
      },
      isLength: {
        options: [{
          min: 1,
          max: 280
        }],
        errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
      }
    },
    campusPostPollOptionId: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Post Poll Option Id'
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
 * In which if the user is still unverified
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postCampusPostReply (req, res, next) {
  let user = req.$scope.user;
  let campusPostId = req.$params.postId;
  let campusPostPollOptionId = req.$params.campusPostPollOptionId;// eslint-disable-line id-length
  let comment = req.$params.comment;

  return req.db.campusPostReply.create({
    userId: user.id,
    campusPostId: campusPostId,
    campusPostPollOptionId: campusPostPollOptionId,
    comment: comment
  })
  .then(campusPostReply => {
    next();
    return campusPostReply;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPostReply.create Error - post-campus-post-reply');
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
module.exports.logic = postCampusPostReply;
module.exports.response = response;
