'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Interest
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
    interestIds: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Interest Ids'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Interest Ids Should be Array Type'
      },
    },
    userTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Type Id'
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
  let interestIds = JSON.parse(req.$params.interestIds);
  let userInterest = [];

  interestIds.forEach(interestId => {
    userInterest.push({
      userId: user.id,
      interestId: interestId
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
      err: error
    }, 'userInterest.bulkCreate Error - post-user-interests');
  });
}

function checkUserType (req, res, next) {
  return req.db.userType.findOne({
    where: {
      id: req.$params.userTypeId
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
      err: error
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
  let name = `${user.firstName} ${user.lastName}`;

  if (userType.code === 'professionals') {
    file = templates.welcomeProfessionals;
  } else if (userType.code === 'organizationInstitution') {
    file = templates.welcomeOrganizationInstitution;
    name = user.institutionName;
  }

  let values = {
    name: name
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
      err: error
    }, 'pug.convert Error - post-user-register');
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
