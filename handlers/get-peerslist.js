'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Peerslist
 * This is a friend suggestion with
 * same city; opposite sex and same course
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
  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

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

function getUserCourse (req, res, next) {
  let user = req.$scope.user;

  return req.db.userCourse.findAll({
    attributes: ['courseId'],
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(userCourse => {
    req.$scope.userCourse = userCourse;
    next();
    return userCourse;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'societyClub.findAll Error - get-peerslist');
  });
}

function getPeerslist (req, res, next) {
  let user = req.$scope.user;
  let userCourse = req.$scope.userCourse;
  let gender = 'male';

  if (user.gender && user.gender.toLowerCase() === 'male') {
    gender = 'female';
  }

  userCourse = userCourse.map(course => course.courseId);
  return req.db.user.findAll({
    include: [{
      model: req.db.userCourse,
      attributes: [],
      where: {
        courseId: {
          [req.Op.or]: userCourse
        }
      }
    }],
    where: {
      [req.Op.and]: {
        city: user.city,
        gender: gender
      }
    }
  })
  .then(peersList => {
    req.$scope.peersList = peersList;
    next();
    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'societyClub.findAll Error - get-peerslist');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let peersList = req.$scope.peersList;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    peersList: peersList
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.getUserCourse = getUserCourse;
module.exports.logic = getPeerslist;
module.exports.response = response;
