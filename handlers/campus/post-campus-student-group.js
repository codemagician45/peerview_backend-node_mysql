'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Campus Student Group
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
    campusPrivacyId: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Campus Privacy Id'
      },
      isInt: {
        errorMessage: 'Invalid Resource: Campus Privacy Id'
      }
    },
    name: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Name'
      }
    },
    description: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Description'
      }
    },
    adminEmail: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Admin Email'
      },
      isEmail: {
        errorMessage: 'Invalid Resource: Admin Email'
      }
    },
    logo: {
      optional: true
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

function postCampusStudentGroup (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusId = req.$params.campusId;
  let campusPrivacyId = req.$params.campusPrivacyId;
  let name = req.$params.name;
  let description = req.$params.description;
  let adminEmail = req.$params.adminEmail;
  let logo = req.$params.logo;

  return req.db.campusStudentGroup.create({
    userId: user.id,
    campusId: campusId,
    campusPrivacyId: campusPrivacyId,
    name: name,
    description: description,
    adminEmail: adminEmail,
    logo: logo
  })
  .then(campusStudentGroup => {
    req.$scope.campusStudentGroup = campusStudentGroup;
    next();
    return campusStudentGroup;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusStudentGroup.create Error - post-campus-student-group');
  });
}

function addUserToStudentGroup (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let campusStudentGroup = req.$scope.campusStudentGroup;
  let campusPrivacyId = req.$params.campusPrivacyId;

  return req.db.campusPrivacy.findOne({
    where: {
      id: {
        [req.Op.eq]: campusPrivacyId
      }
    }
  })
  .then(campusPrivacy => {
    if (campusPrivacy.name === 'public') {
      return campusPrivacy;
    }

    return req.db.campusStudentGroupUser.create({
      userId: user.id,
      campusStudentGroupId: campusStudentGroup.id
    });
  })
  .then(campusStudentGroupUser => {// eslint-disable-line id-length
    next();
    return campusStudentGroupUser;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPrivacy/campusStudentGroupUser.create Error - post-campus-student-group');
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
module.exports.logic = postCampusStudentGroup;
module.exports.addUserToStudentGroup = addUserToStudentGroup;
module.exports.response = response;
