'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Events
 * This is the events in which the current login
 * user created.
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
    limit: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Limit'
      }
    },
    offset: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Offset'
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

function getEventMyEvents (req, res, next) {
  let user = req.$scope.user;
  let limit = req.$params.limit;
  let offset = req.$params.offset;
  return req.db.event.findAll({
    attributes: {
      exclude: ['cityId', 'userId', 'eventDressCodeId', 'eventTypeId']
    },
    include: [{
      model: req.db.eventDressCode,
      attributes: ['id', 'name']
    }, {
      model: req.db.eventType,
      attributes: ['id', 'name']
    }, {
      model: req.db.city,
      attributes: ['id', 'countryCode']
    }],
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    },
    order: [['createdAt', 'DESC']],
    limit: !limit ? 10 : parseInt(limit),
    offset: !offset ? 0 : parseInt(offset)
  })
  .then(events => {
    req.$scope.events = events;
    next();
    return events;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'event.findAll Error - get-event-my-events');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let events = req.$scope.events;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: events
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getEventMyEvents;
module.exports.response = response;
