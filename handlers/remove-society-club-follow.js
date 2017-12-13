'use strict';

/**
 * @author Jo-Ries Canino
 * @description Remove Society Club follow
 */

const lib = require('../lib');

function validateParams (req, res, next) {
  let paramsSchema = {
    societyClubId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Society Club Id'
      }
    }
  };

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkParams(paramsSchema);
  req.checkHeaders(headerSchema);
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
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function removeSocietyClubFollowUnfollow (req, res, next) {// eslint-disable-line id-length
  let user = req.$scoper.user;
  let societyClubId = req.$params.societyClubId;
  return req.db.societyClubFollow.destory({
    where: {
      [req.Op.and]: {
        userId: user.id,
        societyClubId: societyClubId
      }
    }
  })
  .then(societyClubFollow => {
    next();
    return societyClubFollow;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'societyClubFollow.destroy Error - remove-society-club-follow');
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
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.unfollow = removeSocietyClubFollowUnfollow;
module.exports.response = response;
