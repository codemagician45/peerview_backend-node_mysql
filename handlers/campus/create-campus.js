'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Campus Job
 */

const lib = require('../../lib');
const randomstring = require('randomstring');
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
  let paramsSchema = {
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Campus Name'
      }
    },
    email: {
        notEmpty: {
          errorMessage: 'Missing Resource: Campus Email'
        }
    },
    enrollment_year: {
        notEmpty: {
          errorMessage: 'Missing Resource: Campus Enrollment Year'
        }
    },
    logo: {
        notEmpty: {
          errorMessage: 'Missing Resource: Campus Logo'
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

/**
 * This would be the fallback if password
 * and confirm_password are the same
 * Then check if the email is already existed
 * @see {@link validatePasswordAndConfirmPassword}
 * @see validatePasswordAndConfirmPassword
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function checkifEmailIsExisted (req, res, next) {// eslint-disable-line id-length
  let email = req.$params.email;
  return req.db.campusUser.findOne({
    where: {
      campusEmail: {
          [req.Op.eq]: email
      }
    }
  })
  .then(user => {
    if (user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 103,
        status_message: 'Email Already Exist',
        http_code: 400
      });
    }

    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findOne Error - post-user-register');
  });
}

function createCampus (req, res, next) {
  let name = req.$params.name;
  let email = req.$params.email;
  let enrollment_year = req.$params.enrollment_year;
  let logo = req.$params.logo;

  return req.db.campus.create({
    name: name,
    email: email,
    enrollment_year: enrollment_year,
    logo: logo
  })
  .then(campus => {
    req.$scope.campus = campus;
    next();
    return campus;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusJob.findOne Error - get-campus-job');
  });
}

function deleteAllCampusUser (req, res, next) {
  let user = req.$scope.user;

  return req.db.campusUser.destroy({
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(campusUser => {
    next();
    return campusUser;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postComment.destroy Error - remove-post-comment');
  });
}

function createCampusUser (req, res, next) {
  let email = req.$params.email;
  let enrollment_year = req.$params.enrollment_year;
  let token = randomstring.generate();
  let user = req.$scope.user;
  let campus = req.$scope.campus;

  return req.db.campusUser.create({
      userId: user.id,
      campusId: campus.id,
      enrollment_year: enrollment_year,
      campusEmail: email,
      emailVerified: 0,
      token: token
  })
  .then(campusUser => {
      req.$scope.campusUser = campusUser;
      next();
      return campusUser;
  })
  .catch(error => {
      res.status(500)
      .send(new lib.rpc.InternalError(error));
  
      req.log.error({
      err: error.message
      }, 'Create Campus Error');
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
  let campusUser = req.$scope.campusUser;
  let token = campusUser.token;
  let email = campusUser.campusEmail;
  let name = `${user.firstName}`;
  let file = templates.emailVerification;

  let jotToken = lib.jwt.encode({
    campusUserId: campusUser.id
  }, token);

  let values = {
      name: name,
      verifyEmailUrl: `${config.frontEnd.baseUrl}/campus/verify-email?jotToken=${jotToken}&token=${token}&p=campus`
  };

  lib.pug.convert(file, values)
  .then(content => {
      return lib.email.send(`Thanks for joining Peersview`, email, content);
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
  let campus = req.$scope.campus;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: campus
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.checkifEmailIsExisted = checkifEmailIsExisted;
module.exports.logic = createCampus;
module.exports.deleteAllCampusUser = deleteAllCampusUser;
module.exports.createCampusUser = createCampusUser;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
