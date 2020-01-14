'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get All Campus Class
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

  req.checkParams(paramsSchema);
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

function getCampusClassList (req, res, next) {// eslint-disable-line id-length
  let campusId = req.$params.campusId;

  return req.db.campusCourseClass.findAll({
    include: [{
      model: req.db.campusCourse,
      where: {
        campusId: {
          [req.Op.eq]: campusId
        }
      }
    }]
  })
  .then(campusClassList => {
    req.$scope.campusClassList = campusClassList;
    next();
    return campusClassList;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusCourse.findAll Error - get-campus-class-list');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusClassList = req.$scope.campusClassList;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campusClassList
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusClassList;
module.exports.response = response;
