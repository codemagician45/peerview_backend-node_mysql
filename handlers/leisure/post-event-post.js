'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Event Post
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
    eventId: {
      notEmpty: {
        errorMessage: 'Missing Resource: eventId'
      }
    },
    message: {
      notEmpty: {
        errorMessage: 'Missing Resource: Message'
      },
      isLength: {
        options: [{
          min: 1,
          max: 280
        }],
        errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
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

function postEventPost (req, res, next) {
  let user = req.$scope.user;
  let eventId = req.$scope.eventId;
  let message = req.$params.message;

  return req.db.eventPost.create({
    userId: user.id,
    eventId: eventId,
    message: message,
  })
  .then(eventPost => {
    req.$scope.eventPost = eventPost;
    next();
    return eventPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'eventPost.create Error - post-event-post');
  });
}

function saveAttachments (req, res, next) {
  let eventPost = req.$scope.eventPost;
  let cloudinary = req.$params.attachments
    ? JSON.parse(req.$params.attachments) : [];
  let attachments = [];

  if (cloudinary.length === 0) {
    return next();
  }

  cloudinary.forEach(item => {
    attachments.push({
      eventPostId: eventPost.id,
      cloudinaryPublicId: item.cloudinaryPublicId,
      usage: item.usage
    });
  });

  return req.db.eventAttachment.bulkCreate(attachments)
  .then(eventAttachments => {
    next();
    return eventAttachments;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'eventAttachment.bulkCreate Error - post-event-post');
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
module.exports.logic = postEventPost;
module.exports.saveAttachments = saveAttachments;
module.exports.response = response;
