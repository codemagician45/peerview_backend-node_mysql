'use strict';

/**
 * @author Jo-Ries Canino
 * @description Create private community
 * It includes adding of users in the pending status
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
    communityName: {
      notEmpty: {
        errorMessage: 'Missing Resource: Community Name'
      }
    },
    institutionName: {
      notEmpty: {
        errorMessage: 'Missing Resource: Institution Name'
      }
    },
    users: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Users'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Users'
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

function postCommunity (req, res, next) {
  let communityName = req.$params.communityName;
  let institutionName = req.$params.institutionName;

  return req.db.community.create({
    name: communityName,
    institutionName: institutionName
  })
  .then(community => {
    req.$scope.community = community;
    next();
    return community;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'community.create Error - post-community');
  });
}

function inviteUsers (req, res, next) {
  let users = JSON.parse(req.$params.users);
  let community = req.$scope.community;
  let usersData = [];

  users.forEach(user => {
    usersData.push({
      userId: user.id,
      communityId: community.id
    });
  });

  return req.db.communityUsers.bulkCreate(usersData)
  .then(communityUsers => {
    next();
    return communityUsers;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'communityUsers.bulkCreate Error - post-community');
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
module.exports.logic = postCommunity;
module.exports.inviteUsers = inviteUsers;
module.exports.response = response;
