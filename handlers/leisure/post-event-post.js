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
  let isPostPollUrl = req.route.path.indexOf('event/:eventId/post/poll');
  let bodySchema = {};

  let paramsSchema = {
    eventId: {
      isInt: {
        errorMessage: 'Invalid Resource: Event Id'
      }
    }
  };

  if (isPostPollUrl !== -1) {
    bodySchema = {
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
  } else {
    bodySchema = {
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
          errorMessage: 'Missing Resource: Attachments'
        },
        isArray: {
          errorMessage: 'Invalid Resource: Attachments'
        }
      }
    };
  }

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

function postEventPost (req, res, next) {
  let user = req.$scope.user;
  let eventId = req.$scope.eventId;
  let message = req.$params.message;
  let question = req.$params.question;
  let duration = req.$params.duration;

  return req.db.eventPost.create({
    userId: user.id,
    eventId: eventId,
    message: message,
    question: question,
    duration: duration
  })
  .then(eventPost => {
    req.$scope.eventPost = eventPost;
    // below are use for user credits
    eventPost.newId = eventPost.id + '_eventPost';
    eventPost.credits = 1;
    req.$scope.userCredits = eventPost;
    req.$scope.userId = user.id;
    next();
    return eventPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventPost.create Error - post-event-post');
  });
}

function saveAttachments (req, res, next) {
  let eventPost = req.$scope.eventPost;
  let cloudinary = req.$params.attachments
    ? req.$params.attachments : [];
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

  return req.db.attachment.bulkCreate(attachments)
  .then(eventAttachments => {
    next();
    return eventAttachments;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventAttachment.bulkCreate Error - post-event-post');
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
function saveEventPostPollOption (req, res, next) {// eslint-disable-line id-length
  let eventPost = req.$scope.eventPost;
  let options = req.$params.options;
  let question = req.$params.question;
  let eventPostPollOption = [];// eslint-disable-line id-length

  // check if we have params for question
  if (!question) {return next();}

  options.forEach(option => {
    eventPostPollOption.push({
      name: option,
      eventPostId: eventPost.id
    });
  });

  return req.db.eventPostPollOption.bulkCreate(eventPostPollOption)
  .then(eventPostPollOption => {// eslint-disable-line id-length
    next();
    return eventPostPollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventPostPollOption.bulkCreate Error - post-event-post');
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
module.exports.saveEventPostPollOption = saveEventPostPollOption;
module.exports.response = response;
