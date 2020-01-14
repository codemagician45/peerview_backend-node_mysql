'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of student groups
 * This would also mean of getting user's
 * my club just specify isMyGroup in the path
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
    isMyGroup: {
      optional: true,
      isBoolean: {
        errorMessage: 'Invalid Resource: isMyGroup'
      }
    },
    campusPrivacyId: {
      isInt: {
        errorMessage: 'Missing Resource: Campus Privacy Id'
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

function getCampusStudentGroups (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusId = req.$params.campusId;
  let isMyGroup = req.$params.isMyGroup;
  let campusPrivacyId = req.$params.campusPrivacyId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;

  let where = {
    [req.Op.and]: {
      campusId: campusId,
      campusPrivacyId: campusPrivacyId,
      [req.Op.or]: [{
        isConfirm: false // for now lets have this as false because we don't have admin yet
      }, {
        '$campusStudentGroupUser.userId$': user.id
      }]
    }
  };

  /**
   * Just get the list of student groups if
   * isMyGroup query path is present
   */
  if (isMyGroup && JSON.parse(isMyGroup)) {
    where = {
      [req.Op.and]: {
        campusId: campusId,
        userId: user.id
      }
    };
  }

  return req.db.campusStudentGroup.findAll({
    attributes: {
      exclude: ['userId', 'campusId', 'campusPrivacyId']
    },
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName']
    }, {
      model: req.db.campusStudentGroupUser,
      as: 'campusStudentGroupUser',
      attributes: []
    }],
    where: where,
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(campusStudentGroups => {
    req.$scope.campusStudentGroups = campusStudentGroups;
    next();
    return campusStudentGroups;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusStudentGroup.findAll Error - get-campus-student-groups');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusStudentGroups = req.$scope.campusStudentGroups;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campusStudentGroups
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusStudentGroups;
module.exports.response = response;
