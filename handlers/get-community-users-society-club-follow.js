'use strict';

/**
 * @author Jo-Ries Canino
 * Get Community Users Society Club Follow
 */

const lib = require('../lib');

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
 * @see {@link lib/isCommunityTokenExist}
 * @see isCommunityTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function findUsers (req, res, next) {
  let societyClubId = req.$params.societyClubId;

  req.db.societyClubFollow.findAll({
    attributes: ['userId'],
    where: {
      societyClubId: {
        [req.Op.eq]: societyClubId
      }
    }
  })
  .then(societyClubFollow => {
    req.$scope.userIds = societyClubFollow;
    next();
    return societyClubFollow;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'societyClubFollow.findAll Error - get-community-users-society-club-follow');
  });
}

/**
 * Get all the users in the user
 * specified by the array of userIds
 */
function getCommunityUsersSocietyClubFollow (req, res, next) { // eslint-disable-line id-length
  let userIds = req.$scope.userIds;
  userIds = userIds.map(societyClubFollow => societyClubFollow.userId);

  return req.db.user.findAll({
    where: {
      id: {
        [req.Op.in]: [userIds]
      }
    }
  })
  .then(user => {
    req.$scope.user = user;
    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-community-users-class');
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
    user: user
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.findUsers = findUsers;
module.exports.logic = getCommunityUsersSocietyClubFollow;
module.exports.response = response;
