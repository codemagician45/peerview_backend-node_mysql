'use strict';

/**
 * @author Jo-Ries Canino
 * @description Verify User
 */

const rpc = require('../lib/rpc');

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
    userId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Id Params'
      }
    }
  };

  req.checkParams(paramsSchema);
  return req.getValidationResult()
  .then(validationErrors => {
    if (validationErrors.array().length !== 0) {
      return res.status(400)
      .send(new rpc.ValidationError(validationErrors.array()));
    }

    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));
  });
}

/**
 * Find the user if existed in the the database
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function findUser (req, res, next) {
  let userId = req.$params.userId;

  return req.db.user.findOne({
    where: {
      id: {
        [req.Op.eq]: userId
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'User is not yet registered.',
        http_code: 400
      });
    }

    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - post-verify-user');
  });
}

/**
 * This would be the fallback if the user existed
 * In which if the user is still unverified
 * @see {@link findUser}
 * @see findUser
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function verifyUser (req, res, next) {
  let user = req.$scope.user;

  if (user.isverified !== 0) {
    return res.status(400).send({
      status: 'ERROR',
      status_code: 102,
      status_message: 'Link is expired',
      http_code: 400
    });
  }

  return next();
}

/**
 * This would be the fallback if the user is not yet verified
 * Then it would update the isverified to 1(true)
 * @see {@link verifyUser}
 * @see verifyUser
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateUser (req, res, next) {
  let userId = req.$params.userId;

  return req.db.user.update({
    isverified: 1
  }, {
    where: {
      id: {
        [req.Op.eq]: userId
      }
    }
  })
  .then(user => {
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.update Error - post-verify-user');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  /**
   * @TODO email send
   */
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200
  };

  res.status(200)
  .send(body);
}

module.exports.validateParams = validateParams;
module.exports.findUser = findUser;
module.exports.verifyUser = verifyUser;
module.exports.updateUser = updateUser;
module.exports.response = response;
