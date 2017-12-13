'use strict';

/**
 * @author Jo-Ries Canino
 * @description Community User Approval
 */
const lib = require('../lib');
const templates = require('../templates');

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
    userId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Id'
      }
    }
  };

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkBody(bodySchema);
  req.checkHeaders(headerSchema);
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
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isCommunityTokenExist}
 * @see isCommunityTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateCommunityUserApproval (req, res, next) {// eslint-disable-line id-length
  let community = req.$scope.community;
  let userId = req.$params.userId;
  return req.db.userCommunity.update({
    isApproved: 1
  }, {
    where: {
      [req.Op.and]: {
        userId: userId,
        communityId: community.id
      }
    }
  })
  .then(userCommunity => {
    req.$scope.userCommunity = userCommunity;
    next();
    return userCommunity;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'userCommunity.update Error - update-community-user-approval');
  });
}

/**
 * Build necessary data for next route of
 * sending an email
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function buildNeededEmailParams (req, res, next) {// eslint-disable-line id-length
  let userId = req.$params.userId;
  return req.db.user.findOne({
    where: {
      id: {
        [req.Op.eq]: userId
      }
    }
  })
  .then(user => {
    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - update-community-user-approval');
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
  let community = req.$scope.community;
  let file = templates.acknowledgeCommunity;
  let values = {
    name: user.firstName,
    link: `http://${req.hostname}`,
    institutionsName: community.name
  };

  lib.pug.convert(file, values)
  .then(content => {
    return lib.email.send(`${user.email} Welcome To Online Campus`, user.email, content);
  })
  .then(pug => {
    next();
    return pug;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'pug.convert Error - update-community-user-approval');
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
module.exports.updateCommunityUserApproval = updateCommunityUserApproval;
module.exports.buildNeededEmailParams = buildNeededEmailParams;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
