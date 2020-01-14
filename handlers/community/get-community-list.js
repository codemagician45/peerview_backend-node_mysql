'use strict';

const lib = require('../../lib');

const getCommunityList = (req, res, next) => {
  let user = req.$scope.user;

  return req.db.community.findAll({
    include: [{
      model: req.db.communityUsers,
      where: {
        userId: user.id
        // status: 'approved'
      }
    }]
  })
  .then((communityList) => {
    req.$scope.communityList = communityList;

    next();
    return communityList;
  })
  .catch(error => {
    req.log.error({
      error: error
    }, 'handlers.community get-community [community.findAll] Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
};

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
const response = (req, res) => {
  let communityList = req.$scope.communityList;
  let body = lib.response.createOk(communityList);

  res.status(lib.httpCodes.OK).send(body);
};

module.exports.logic = getCommunityList;
module.exports.response = response;
