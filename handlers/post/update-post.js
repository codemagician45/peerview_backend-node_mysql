'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update Post
 */

const lib = require('../../lib');
const moment = require('moment');

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
  let isPostPollUrl = req.route.path.indexOf('post/poll');
  let isPostStory = req.route.path.indexOf('post/story');
  let bodySchema = {};

  let paramsSchema = {
    postId: {
      isInt: {
        errorMessage: 'Invalid Resource: Post Id'
      }
    }
  };

  if (isPostPollUrl !== -1) {
    bodySchema = {
      'postPoll.question': {
        isLength: {
          options: [{
            min: 1
          }],
          errorMessage: 'Missing Resource: Question'
        }
      },
      'postPoll.options': {
        isArrayNotEmpty: {
          errorMessage: 'Missing Resource: Options'
        },
        isArray: {
          errorMessage: 'Invalid Resource: Options'
        }
      },
      'postPoll.duration': {
        isLength: {
          options: [{
            min: 1
          }],
          errorMessage: 'Missing Resource: Duration'
        },
        isInt: {
          errorMessage: 'Invalid Resource: Duration'
        }
      }
    };
  } else if (isPostStory !== -1) {
    bodySchema = {
      title: {
        isLength: {
          options: [{
            min: 1
          }],
          errorMessage: 'Missing Resource: Title'
        }
      },
      message: {
        isLength: {
          options: [{
            min: 1,
            max: 600
          }],
          errorMessage: `Invalid Resource: Minimum 1 and maximum 600 characters are allowed`
        }
      }
    };
  } else {
    bodySchema = {
      message: {
        isLength: {
          options: [{
            min: 1,
            max: 280
          }],
          errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
        }
      },
      postTo: {
        optional: true,
        isInt: {
          errorMessage: 'Invalid Resource: postTo'
        }
      },
      attachments: {
        optional: true,
        isArray: {
          errorMessage: 'Invalid Resource: Attachments'
        }
      }
    };
  }

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
function postPost (req, res, next) {
  let postId = req.$params.postId;
  let user = req.$scope.user;
  let title = req.$params.title;
  let message = req.$params.message;
  let postTo = req.$params.postTo;
  let question = undefined;
  let duration = undefined;
  let pollExpiration = undefined;

  if (JSON.stringify(req.$params.postPoll) !== '{}' && req.$params.postPoll.question) {
    question = req.$params.postPoll.question;
    duration = req.$params.postPoll.duration;
    pollExpiration = moment().add(duration, 'day');
  }

  return req.db.post.update({
    userId: user.id,
    message: message,
    title: title,
    question: question,
    duration: duration,
    postTo: postTo,
    pollExpiration: pollExpiration
  }, {
    where: {
      id: postId
    }
  })
  .then(post => {
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
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postPost;
module.exports.response = response;
