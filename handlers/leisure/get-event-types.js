'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Event Type
 */

const lib = require('../../lib');

function getEventTypes (req, res, next) {
  return req.db.eventType.findAll({
    attributes: ['id', 'name']
  })
  .then(eventTypes => {
    req.$scope.eventTypes = eventTypes;
    next();
    return eventTypes;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventType.findAll Error - get-event-types');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let eventTypes = req.$scope.eventTypes;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: eventTypes
  };

  res.status(200).send(body);
}

module.exports.logic = getEventTypes;
module.exports.response = response;
