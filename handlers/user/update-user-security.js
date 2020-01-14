'use strict';

/**
 * @author Jo-Ries Canino
 * @description Put User Security
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
    protectPost: {
      notEmpty: {
        errorMessage: 'Missing Resource: Protect Post'
      },
      isBoolean: {
        errorMessage: 'Invalid Resource: Protect Post'
      }
    },
    userPrivacyId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Privacy Id'
      },
      isInt: {
        errorMessage: 'Invalid Resource: User Privacy Id'
      }
    },
    profilePrivacy: {
      notEmpty: {
        errorMessage: 'Missing Resource: Profile Privacy'
      },
      isBoolean: {
        errorMessage: 'Invalid Resource: Profile Privacy'
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

function updateUserSecurity (req, res, next) {
  let user = req.$scope.user;
  let protectPost = req.$params.protectPost;
  let userPrivacyId = req.$params.userPrivacyId;
  let profilePrivacy = req.$params.profilePrivacy;

  return req.db.user.update({
    protectPost: protectPost,
    userPrivacyId: userPrivacyId,
    profilePrivacy: profilePrivacy
  }, {
    where: {
      id: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(user => {
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.update Error - put-user-security');
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
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = updateUserSecurity;
module.exports.response = response;
