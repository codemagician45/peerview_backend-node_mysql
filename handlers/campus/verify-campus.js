'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Email Verification
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

function postCampusVerifyEmail (req, res, next) {
    let token = req.$params.token;
    let jotToken = req.$params.jotToken;
    let decoded = lib.jwt.decode(jotToken, token);
    console.log('decoded.campusUserId', decoded.campusUserId);
    return req.db.campusUser.update({
        emailVerified: 1
    }, {
        where: {
            id: {
                [req.Op.eq]: decoded.campusUserId
            }
        }
    })
    .then(async campusUser => {
        req.$scope.campusUser = await req.db.campusUser.findOne({
            where: {
                id: {
                    [req.Op.eq]: decoded.campusUserId
                }
            }
        });
        next();
        return campusUser;
    })
    .catch(error => {
        res.status(500)
        .send(new lib.rpc.InternalError(error));

        req.log.error({
        err: error.message
        }, 'user.update Error - post-user-verify-email');
    });
}

function postCampusActivate (req, res, next) {
    let campusUser = req.$scope.campusUser;

    console.log('campus id', campusUser.campusId);

    return req.db.campus.update({
        status: 1
    }, {
        where: {
            id: {
                [req.Op.eq]: campusUser.campusId
            },
            status: {
                [req.Op.eq]: 0
            }
        }
    })
    .then(async campus => {
        req.$scope.campus = await req.db.campus.findOne({
            where: {
                id: {
                    [req.Op.eq]: campusUser.campusId
                }
            }
        });
        next();
        return campus;
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
module.exports.logic = postCampusVerifyEmail;
module.exports.postCampusActivate = postCampusActivate;
module.exports.response = response;
