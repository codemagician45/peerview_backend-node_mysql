'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Email Verification
 */

const moment = require('moment');
const randomstring = require('randomstring');
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
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  let paramsSchema = {
    jotToken: {
      notEmpty: {
        errorMessage: 'Missing Resource: Jot Token'
      }
    }
  };

  req.checkBody(bodySchema);
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

function findUser (req, res, next) {
  let token = req.$params.token;
  let jotToken = req.$params.jotToken;
  let decoded = lib.jwt.decode(jotToken, token);
  let tokenActiveDate = moment(new Date()).utc();

  return req.db.user.findOne({
    where: {
      id: {
        [req.Op.eq]: decoded.userId
      },
      tokenActiveDate: {
        [req.Op.gte]: tokenActiveDate
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Invalid Resoure: Jot Token',
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
    }, 'user.findOne Error - post-user-verify-email');
  });
}

function postUserVerifyEmail (req, res, next) {
  let user = req.$scope.user;
  let token = randomstring.generate();

  return req.db.user.update({
    token: token
  }, {
    where: {
      id: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(user => {
    req.$scope.user.token = token;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.update Error - post-user-verify-email');
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
module.exports.findUser = findUser;
module.exports.logic = postUserVerifyEmail;
module.exports.response = response;
