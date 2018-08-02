'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Event Dress Codes
 */

const lib = require('../../lib');

function getEventDressCodes (req, res, next) {
  return req.db.eventDressCode.findAll({
    attributes: ['id', 'name']
  })
  .then(eventDressCodes => {
    req.$scope.eventDressCodes = eventDressCodes;
    next();
    return eventDressCodes;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventDressCode.findAll Error - get-event-dress-codes');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let eventDressCodes = req.$scope.eventDressCodes;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: eventDressCodes
  };

  res.status(200).send(body);
}

module.exports.logic = getEventDressCodes;
module.exports.response = response;
