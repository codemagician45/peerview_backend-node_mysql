'use strict';

/**
 * @author Jo-Ries Canino
 * @description Invite a user to the platform
 */

const lib = require('../../lib');
const templates = require('../../templates');

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
    email: {
      notEmpty: {
        errorMessage: 'Missing Resource: Email'
      },
      isEmail: {
        errorMessage: 'Invalid Resource: Email'
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

function checkIfUserAlreadyInvited (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let email = req.$params.email;
  // we have to check if we have an invite already available
  req.db.userInvite.findOne({
    where: {
      [req.Op.and]: {
        emailToInvite: email,
        inviter: user.id
      }
    }
  })
  .then(userInvite => {
    req.$scope.userInvite = userInvite;
    next();
    return userInvite;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userInvite.findOne Error - post-user-invite-peers');
  });
}

function postUserInvitePeers (req, res, next) {
  let user = req.$scope.user;
  let email = req.$params.email;
  let userInvite = req.$scope.userInvite;

  if (userInvite) {
    return next();
  }

  req.db.userInvite.create({
    emailToInvite: email,
    inviter: user.id
  })
  .then(userInvite => {
    next();
    return userInvite;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userInvite.create Error - post-user-invite-peers');
  });
}

/**
 * Send an Email
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function sendEmail (req, res, next) {
  let user = req.$scope.user;
  let emailToInvite = req.$params.email;
  let inviter = `${user.firstName} ${user.lastName}`;
  let file = templates.invitePeers;

  let values = {
    emailToInvite: emailToInvite,
    inviter: inviter
  };

  lib.pug.convert(file, values)
  .then(content => {
    return lib.email.send(`You have a special Invitation`, emailToInvite, content);
  })
  .then(pug => {
    next();
    return pug;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'pug.convert Error - post-user-invite-peers');
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
module.exports.logic = postUserInvitePeers;
module.exports.checkIfUserAlreadyInvited = checkIfUserAlreadyInvited;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
