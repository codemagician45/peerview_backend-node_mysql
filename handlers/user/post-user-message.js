'use strict';

/**
 * @author Jo-Ries Canino
 * @description Direct Message to a user
 * Using realtime messaging perse
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
    userId: {
      isInt: {
        errorMessage: 'Invalid Resource: Post To Id'
      }
    }
  };

  let bodySchema = {
    title: {
      notEmpty: {
        errorMessage: 'Missing Resource: Title'
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

// basically you have to check the privacy settings of the user
function checkUserPrivacy (req, res, next) {
  let userId = req.$params.userId;
  return req.db.user.findOne({
    where: {
      id: {
        [req.Op.eq]: userId
      }
    }
  })
  .then(user => {
    if (!user.profilePrivacy) {
      return next();
    }

    return res.status(400).send({
      status: 'ERROR',
      status_code: 102,
      status_message: 'Invalid Resource: Profile Privacy',
      http_code: 400
    });
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findOne Error - post-user-message');
  });
}

/**
 * This would be the fallback if the user existed
 * In which if the user is still unverified
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postUserMessage (req, res, next) {
  let user = req.$scope.user;
  let destinationId = req.$params.userId;
  let message = req.$params.message;

  return req.db.userMessage.create({
    fromId: user.id,
    destinationId: destinationId,
    message: message
  })
  .then(post => {
    next();
    return post;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userMessage.create Error - post-user-message');
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
module.exports.checkUserPrivacy = checkUserPrivacy;
module.exports.logic = postUserMessage;
module.exports.response = response;
