'use strict';

/**
 * @author Jo-Ries Canino
 * @description POST Message
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  keyword: { in: ['query'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Keyword'
    }
  }
};

const getUserSearchViaTag = (req, res, next) => {
  let keyword = req.$params.keyword;

  return req.db
  .user
  .findAll({
    attributes: [
      'id',
      'name',
      'firstName',
      'lastName',
      'profilePicture',
      'socialImage'
    ],
    where: {
      [req.Op.or]: [{
        lastName: {
          [req.Op.like]: `%${keyword}%`
        }
      }, {
        firstName: {
          [req.Op.like]: `%${keyword}%`
        }
      }]
    },
    limit: 10
  })
  .then((userList) => {
    req.$scope.userList = userList;

    next();
    return userList;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.user get-user-search [user.findAll] Error');

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
  let userList = req.$scope.userList;
  let body = lib.response.createOk(userList);

  res.status(lib.httpCodes.OK).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = getUserSearchViaTag;
module.exports.response = response;
