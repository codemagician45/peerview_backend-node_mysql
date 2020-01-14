'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Campus Society Club
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
    title: {
      notEmpty: {
        errorMessage: 'Missing Resource: Title'
      }
    },
    description: {
      notEmpty: {
        errorMessage: 'Missing Resource: Description'
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

function postCampusSocietyClub (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusId = req.$params.campusId;
  let title = req.$params.title;
  let description = req.$params.description;

  return req.db.campusSocietyClub.create({
    userId: user.id,
    campusId: campusId,
    title: title,
    description: description
  })
  .then(campusSocietyClub => {
    next();
    return campusSocietyClub;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusSocietyClub.create Error - post-campus-society-club');
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
module.exports.logic = postCampusSocietyClub;
module.exports.response = response;
