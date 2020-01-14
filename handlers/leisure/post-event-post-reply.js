'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Event Post Reply
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
    eventPostId: {
      isInt: {
        errorMessage: 'Invalid Resource: Event Post Id'
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
    eventPostPollOptionId: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Event Post Poll Option Id'
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
function postEventPostReply (req, res, next) {
  let user = req.$scope.user;
  let eventPostId = req.$params.eventPostId;
  let eventPostPollOptionId = req.$params.eventPostPollOptionId;// eslint-disable-line id-length
  let comment = req.$params.comment;

  return req.db.eventPostReply.create({
    eventPostId: eventPostId,
    userId: user.id,
    eventPostPollOptionId: eventPostPollOptionId,
    comment: comment
  })
  .then(eventPostReply => {
    eventPostReply.newId = eventPostReply.id + '_eventPostReply';
    eventPostReply.credits = 1;
    req.$scope.userCredits = eventPostReply;
    req.$scope.userId = user.id;
    next();
    return eventPostReply;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventPostReply.create Error - post-event-post-reply');
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
module.exports.logic = postEventPostReply;
module.exports.response = response;
