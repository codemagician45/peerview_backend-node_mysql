'use strict';

/**
 * @author Jo-Ries Canino
 * @description Create Brainstorming Map
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
    campusId: {
      isInt: {
        errorMessage: 'Invalid Resource: Campus Id'
      }
    }
  };

  let bodySchema = {
    jsonData: {
      notEmpty: {
        errorMessage: 'Missing Resource: JSON Data'
      },
      isJSON: {
        errorMessage: 'Invalid Resource: JSON Data'
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

function postCampusPostBrainstormingPost (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusId = req.$params.campusId;
  let jsonData = req.$params.jsonData;

  return req.db.campusPostBrainstorming.create({
    userId: user.id,
    campusId: campusId,
    jsonData: jsonData
  })
  .then(campusPostBrainstorming => {// eslint-disable-line id-length
    req.$scope.campusPostBrainstorming = campusPostBrainstorming;
    next();
    return campusPostBrainstorming;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPostBrainstorming.create Error - post-campus-class-brainstorming');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusPostBrainstorming = req.$scope.campusPostBrainstorming;// eslint-disable-line id-length
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    campusPostBrainstorming: campusPostBrainstorming
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCampusPostBrainstormingPost;
module.exports.response = response;
