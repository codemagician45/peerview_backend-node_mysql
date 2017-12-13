'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Poll
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
    question: {
      notEmpty: {
        errorMessage: 'Missing Resource: Question'
      }
    },
    options: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Options'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Options'
      }
    },
    duration: {
      notEmpty: {
        errorMessage: 'Missing Resource: Duration'
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
function postPoll (req, res, next) {
  let user = req.$scope.user;
  let question = req.$params.question;
  let duration = req.$params.duration;

  return req.db.poll.create({
    question: question,
    duration: duration,
    userId: user.id
  })
  .then(poll => {
    req.$scope.poll = poll;
    next();
    return poll;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'poll.create Error - post-poll');
  });
}

/**
 * Save the options in the pollOption table
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function savePollOption (req, res, next) {
  let pollId = req.$scope.poll.id;
  let options = req.$params.options;
  let pollOption = [];

  options.forEach(option => {
    pollOption.push({
      name: option,
      pollId: pollId
    });
  });

  return req.db.pollOption.create(pollOption)
  .then(pollOption => {
    next();
    return pollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'pollOption.create Error - post-poll');
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
module.exports.logic = postPoll;
module.exports.savePollOption = savePollOption;
module.exports.response = response;
