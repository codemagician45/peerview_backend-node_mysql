'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Event
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
  let bodySchema = {
    description: {
      notEmpty: {
        errorMessage: 'Missing Resource: Description'
      }
    },
    startDate: {
      notEmpty: {
        errorMessage: 'Missing Resource: Start Date'
      },
      isISO8601: {
        errorMessage: 'Invalid Resource: Start Date'
      }
    },
    endDate: {
      notEmpty: {
        errorMessage: 'Missing Resource: End Date'
      },
      isISO8601: {
        errorMessage: 'Invalid Resource: End Date'
      }
    },
    ticketSalesEndDate: {
      notEmpty: {
        errorMessage: 'Missing Resource: Ticket Sales End Date'
      },
      isISO8601: {
        errorMessage: 'Invalid Resource: Ticket Sales End Date'
      }
    },
    venueAddress: {
      notEmpty: {
        errorMessage: 'Missing Resource: Address'
      }
    },
    cityId: {
      notEmpty: {
        errorMessage: 'Missing Resource: City Id'
      }
    },
    ticketPrice: {
      notEmpty: {
        errorMessage: 'Missing Resource: Ticket Price'
      },
      isFloat: {
        errorMessage: 'Invalid Resource: Ticket Price'
      }
    },
    institutionName: {
      optional: true
    },
    eventDressCodeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Event Dress Code Id'
      },
      isInt: {
        errorMessage: 'Invalid Resource: Event Dress Code Id'
      }
    },
    eventTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Event Type Id'
      },
      isInt: {
        errorMessage: 'Invalid Resource: Event Type Id'
      }
    },
    organizerBankAccount: {
      notEmpty: {
        errorMessage: 'Missing Resource: Organizer Bank Account'
      }
    },
    organizerContactDetails: {
      notEmpty: {
        errorMessage: 'Missing Resource: Organizer Contact Details'
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
module.exports.response = response;
