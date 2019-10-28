'use strict';

/**
 * @author Jo-Ries Canino
 * @description User Login
 */

const md5 = require('MD5');
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
  let bodySchema = {
    email: {
      notEmpty: {
        errorMessage: 'Missing Resource: Email'
      }
    },
    password: {
      notEmpty: {
        errorMessage: 'Missing Resource: Password'
      },
      isAscii: {
        errorMessage: `Invalid Resource: Should only contain ASCII characters only`
      },
      isLength: {
        options: [{
          min: 8,
          max: 24
        }],
        errorMessage: `Invalid Resource: Minimum 8 and maximum 24 characters are allowed`
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
 * Will check if the user is existed
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postUserLogin (req, res, next) {
  let email = req.$params.email;
  let password = md5(req.$params.password);

  const sequelize = req.db.userCredits.sequelize;
  
  return req.db.user.findOne({
    include: [
      {
        model: req.db.userInterest,
        include: [{
          model: req.db.interest
        }]
      }, {
        model: req.db.userType
      }, {
        model: req.db.userCourse,
        include: {
          model: req.db.course
        }
      }, {
        model: req.db.userFollower,
        as: 'followee',
        attributes: []
      }, {
        model: req.db.userCredits,
        attributes: [
          [sequelize.fn('SUM',
            sequelize.col('credits')), 'totalCredits'],
        ],
      }, {
        model: req.db.workExperience
      }, {
        model: req.db.userSkill
      }
    ],
    where: {
      [req.Op.and]: {
        email: email,
        password: password,
        token: {
          [req.Op.ne]: null // this is possible because token will be given a value in the post-user-verify-email route
        }
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Invalid Email/Password or User is not yet Validated.',
        http_code: 400
      });
    }

    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findOne Error - post-user-login');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let user = req.$scope.user;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: user
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postUserLogin;
module.exports.response = response;
