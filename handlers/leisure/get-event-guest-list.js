'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Guest List
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
      isInt: {
        errorMessage: 'Invalid Resource: eventId'
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

function getEventGuestList (req, res, next) {
  let eventId = req.$params.eventId;

  return req.db.eventGuestList.findAll({
    attributes: {
      exclude: ['userId', 'eventId']
    },
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName']
    }],
    eventId: eventId
  })
  .then(eventGuestList => {
    req.$scope.eventGuestList = eventGuestList;
    next();
    return eventGuestList;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventGuestList.findAll Error - get-event-guest-list');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let eventGuestList = req.$scope.eventGuestList;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: eventGuestList
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getEventGuestList;
module.exports.response = response;
