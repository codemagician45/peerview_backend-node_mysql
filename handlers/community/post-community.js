'use strict';

/**
 * @author Jo-Ries Canino
 * @description Create private community
 * It includes adding of users in the pending status
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  communityName: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Community Name'
    }
  },
  institutionName: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Institution Name'
    }
  },
  users: { in: ['body'],
    optional: true
  }
};

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
      err: error.message
    }, 'community.create Error - post-community');
  });
}

function inviteUsers (req, res, next) {
  let userId = req.$scope.user.id;
  let users = req.$params.users;
  let community = req.$scope.community;
  let usersData = [{// auto register the user created it
    userId: userId,
    communityId: community.id,
    status: 'approved',
    isCreator: true
  }];

  if (!users) {
    users = [];
  }

  users.forEach(id => {
    usersData.push({
      userId: id,
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
      err: error.message
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

module.exports.querySchema = querySchema;
module.exports.logic = postCommunity;
module.exports.inviteUsers = inviteUsers;
module.exports.response = response;
