'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Event Poll
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
    eventId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Event Id'
      },
      isInt: {
        errorMessage: 'Invalid Resource: Event Id'
      }
    }
  };

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
      },
      isInt: {
        errorMessage: 'Invalid Resource: Duration'
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
function postEventPoll (req, res, next) {
  let user = req.$scope.user;
  let question = req.$params.question;
  let duration = req.$params.duration;

  return req.db.eventPostPoll.create({
    question: question,
    duration: duration,
    userId: user.id
  })
  .then(eventPostPoll => {
    req.$scope.eventPostPoll = eventPostPoll;
    next();
    return eventPostPoll;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'eventPostPoll.create Error - post-event-poll');
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
function saveEventPollOption (req, res, next) {
  let eventPostPoll = req.$scope.eventPostPoll;
  let options = req.$params.options;
  let eventPollOption = [];

  options.forEach(option => {
    eventPollOption.push({
      name: option,
      eventPollId: eventPostPoll.id
    });
  });

  return req.db.eventPostPollOption.bulkCreate(eventPollOption)
  .then(eventPostPollOption => {
    next();
    return eventPostPollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'eventPostPollOption.bulkCreate Error - post-event-poll');
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
module.exports.logic = postEventPoll;
module.exports.saveEventPollOption = saveEventPollOption;
module.exports.response = response;
