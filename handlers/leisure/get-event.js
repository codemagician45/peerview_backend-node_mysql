'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get an Event
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

function getEvent (req, res, next) {
  let eventId = req.$params.eventId;

  return req.db.event.findOne({
    where: {
      id: {
        [req.Op.eq]: eventId
      }
    }
  })
  .then(event => {
    req.$scope.event = event;
    next();
    return event;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'event.findOne Error - get-event');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let event = req.$scope.event;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: event
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getEvent;
module.exports.response = response;
