'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update Community User Classes
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
  let bodySchema = {
    classIds: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Course Class Ids'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Course Class Ids Should be Array Type'
      },
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
function checkForClassLength (req, res, next) {
  let classIds = req.$params.classIds;

  if (classIds.length > 7) {
    return res.status(400).send({
      status: 'ERROR',
      status_code: 102,
      status_message: 'Classes must be less than 7',
      http_code: 400
    });
  }

  return next();
}

/**
 * Remove the class specified in the
 * classIds using transaction
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function removeCommunityUserClass (req, res, next) {// eslint-disable-line id-length
  let courseClassId = req.$params.classIds;
  return req.sequelize
  .transaction()
  .then(function (transaction) {
    req.$scope.transaction = transaction;
    return req.db.userClass.destroy({
      where: {
        courseClassId: {
          [req.Op.in]: courseClassId
        }
      }
    }, {transaction: transaction})
    .then(userClass => {
      return userClass;
    })
    .catch(error => {
      res.status(500)
      .send(new lib.rpc.InternalError(error));

      req.log.error({
        err: error.message
      }, 'userClass.bulkCreate Error - update-community-user-class');
    });
  })
  .then(transaction => {
    // this time it is auto commit in which
    // the data has been saved
    next();
    return transaction;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'sequelize.transaction Error - update-community-user-class');
  });
}

/**
 * Make a bulkCreate for userClass
 * in which we commit the transaction
 * after we have successful bulkCreate operation
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function updateCommunityUserClass (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let classIds = req.$params.classIds;
  let transaction = req.$scope.transaction;
  let bulkCreate = [];

  classIds.forEach(id => {
    bulkCreate.push({
      userId: user.id,
      courseClassId: id
    });
  });

  return req.db.userClass.bulkCreate(bulkCreate)
  .then(userClass => {
    transaction.commit();
    next();
    return userClass;
  })
  .catch(error => {
    transaction.rollback();
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userClass.bulkCreate Error - update-community-user-class');
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
module.exports.checkForClassLength = checkForClassLength;
module.exports.removeCommunityUserClass = removeCommunityUserClass;
module.exports.logic = updateCommunityUserClass;
module.exports.response = response;
