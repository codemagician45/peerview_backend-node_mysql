'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Interest
 */
const lib = require('../../lib');
const templates = require('../../templates');
const config = require('../../config');

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
    subInterestIds: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Interest Ids'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Interest Ids Should be Array Type'
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
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postUserInterests (req, res, next) {
  let user = req.$scope.user;
  let subInterestIds = req.$params.subInterestIds;
  let userInterest = [];

  subInterestIds.forEach(subInterestId => {
    userInterest.push({
      userId: user.id,
      interestId: subInterestId
    });
  });

  return req.db.userInterest.bulkCreate(userInterest)
  .then(userInterest => {
    next();
    return userInterest;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userInterest.bulkCreate Error - post-user-interests');
  });
}

function checkUserType (req, res, next) {
  let user = req.$scope.user;
  return req.db.userType.findOne({
    where: {
      id: user.userTypeId
    }
  })
  .then(userType => {
    req.$scope.userType = userType;
    next();
    return userType;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userType.findOne Error - post-user-interests');
  });
}

/**
 * Send an Email for welcoming the user
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function sendEmail (req, res, next) {
  let user = req.$scope.user;
  let userType = req.$scope.userType;
  let file = templates.welcomeStudent;
  let name = `${user.firstName}`;

  if (userType.code === 'professionals') {
    name = `${user.firstName} ${user.lastName}`;
    file = templates.welcomeProfessionals;
  } else if (userType.code === 'organizationInstitution') {
    file = templates.welcomeOrganizationInstitution;
    name = user.institutionName;
  }

  let values = {
    name: name,
    homepageUrl: `${config.frontEnd.baseUrl}`,
    unsubscribeUrl: `${config.frontEnd.baseUrl}`,
    contactUsUrl: `${config.frontEnd.baseUrl}/contact-us`,
    privacyUrl: `${config.frontEnd.baseUrl}/privacy-policy`,
    exploreCommunityPage: `${config.frontEnd.baseUrl}/community/student-community/landing`,
    campusPage: `${config.frontEnd.baseUrl}/campus`
  };

  lib.pug.convert(file, values)
  .then(content => {
    return lib.email.send(`Welcome to Peersview`, user.email, content);
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
    }, 'pug.convert Error - post-user-interests');
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
module.exports.logic = postUserInterests;
module.exports.checkUserType = checkUserType;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
