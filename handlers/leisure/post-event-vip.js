'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Event VIP
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

  let bodySchema = {
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Name'
      }
    },
    phoneNumberOrEmail: {
      notEmpty: {
        errorMessage: 'Missing Resource: Phone Number/Email'
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

function postEventVIP (req, res, next) {
  let user = req.$scope.user;
  let eventId = req.$params.eventId;
  let name = req.$params.name;
  let phoneNumberOrEmail = req.$params.phoneNumberOrEmail;

  return req.db.eventVIP.create({
    eventId: eventId,
    senderId: user.id,
    name: name,
    phoneNumberOrEmail: phoneNumberOrEmail
  })
  .then(eventVIP => {
    next();
    return eventVIP;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventVIP.create Error - post-event-vip');
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
module.exports.logic = postEventVIP;
module.exports.response = response;
