'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Community User Classes
 */

const lib = require('../lib');

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
    classIds: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Course Class Ids'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Course Class Ids Should be Array Type'
      },
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
function postCommunityUserClass (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let classIds = req.$params.classIds;
  let bulkCreate = [];

  if (classIds.length > 7) {
    return res.status(400).send({
      status: 'ERROR',
      status_code: 102,
      status_message: 'Classes must be less than 7',
      http_code: 400
    });
  }

  classIds.forEach(id => {
    bulkCreate.push({
      userId: user.id,
      courseClassId: id
    });
  });

  return req.db.userClass.bulkCreate(bulkCreate)
  .then(userClass => {
    next();
    return userClass;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'userClass.bulkCreate Error - post-community-user-class');
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
module.exports.logic = postCommunityUserClass;
module.exports.response = response;
