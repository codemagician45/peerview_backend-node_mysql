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
    title: {
      notEmpty: {
        errorMessage: 'Missing Resource: Title'
      }
    },
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
    },
    attachments: {
      optional: true,
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Cloudinary'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Cloudinary'
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

function postEvent (req, res, next) {
  let user = req.$scope.user;
  let title = req.$params.title;
  let description = req.$params.description;
  let startDate = req.$params.startDate;
  let endDate = req.$params.endDate;
  let ticketSalesEndDate = req.$params.ticketSalesEndDate;
  let venueAddress = req.$params.venueAddress;
  let cityId = req.$params.cityId;
  let ticketPrice = req.$params.ticketPrice;
  let institutionName = req.$params.institutionName;
  let eventDressCodeId = req.$params.eventDressCodeId;
  let eventTypeId = req.$params.eventTypeId;
  let organizerBankAccount = req.$params.organizerBankAccount;
  let organizerContactDetails = req.$params.organizerContactDetails;// eslint-disable-line id-length

  return req.db.event.create({
    userId: user.id,
    title: title,
    description: description,
    startDate: startDate,
    endDate: endDate,
    ticketSalesEndDate: ticketSalesEndDate,
    venueAddress: venueAddress,
    cityId: cityId,
    ticketPrice: ticketPrice,
    institutionName: institutionName,
    eventDressCodeId: eventDressCodeId,
    eventTypeId: eventTypeId,
    organizerBankAccount: organizerBankAccount,
    organizerContactDetails: organizerContactDetails
  })
  .then(event => {
    req.$scope.event = event;

    // auto subscribe the user in the
    // guest list
    return req.db.eventGuestList.create({
      eventId: event.id,
      userId: user.id,
      isCreator: true
    });
  })
  .then(eventGuestList => {
    next();
    return eventGuestList;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'event.create Error - post-event');
  });
}

/**
 * Basically save any data in their corresponding
 * table for req.$params.cloudinaryPublicIds
 * which type would be images, posters, and
 * videos
 */
function saveAttachments (req, res, next) {
  let event = req.$scope.event;
  let cloudinary = req.$params.attachments
    ? req.$params.attachments : [];

  if (cloudinary.length === 0) {
    return next();
  }

  let eventAttachment = [];
  cloudinary.forEach(item => {
    eventAttachment.push({
      eventId: event.id,
      cloudinaryPublicId: item.id,
      usage: item.usage
    });
  });

  req.db.eventAttachment.bulkCreate(eventAttachment)
  .then(eventAttachment => {
    next();
    return eventAttachment;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventAttachment.bulkCreate Error - post-event');
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
module.exports.logic = postEvent;
module.exports.saveAttachments = saveAttachments;
module.exports.response = response;
