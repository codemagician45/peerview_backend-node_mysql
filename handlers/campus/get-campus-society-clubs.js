'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Societies and Clubs
 * This would also mean of getting user's
 * my club just specify isMyClub in the path
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
        errorMessage: 'Missing Resource: Campus Id'
      }
    },
    isMyClub: {
      optional: true,
      isBoolean: {
        errorMessage: 'Invalid Resource: isMyClub'
      }
    },
    offset: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Offset'
      }
    },
    limit: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Limit'
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

function getCampusSocietyClubs (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusId = req.$params.campusId;
  let isMyClub = req.$params.isMyClub;
  let offset = req.$params.offset;
  let limit = req.$params.offset;
  let where = {
    [req.Op.and]: {
      campusId: campusId,
      isConfirm: true
    }
  };

  /**
   * Just get the list of society-clubs if
   * isMyClub query path is present
   */
  if (isMyClub && JSON.parse(isMyClub)) {
    where = {
      [req.Op.and]: {
        campusId: campusId,
        userId: user.id,
        isConfirm: true
      }
    };
  }

  return req.db.campusSocietyClub.findAll({
    where: where,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(campusSocietyClubs => {
    req.$scope.campusSocietyClubs = campusSocietyClubs;
    next();
    return campusSocietyClubs;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusSocietyClub.findAll Error - get-campus-society-club');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusSocietyClubs = req.$scope.campusSocietyClubs;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campusSocietyClubs
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusSocietyClubs;
module.exports.response = response;
