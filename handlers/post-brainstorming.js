'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post brainstorming
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
    topicName: {
      notEmpty: {
        errorMessage: 'Missing Resource: Topic Name'
      }
    },
    typeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Topic Name'
      }
    },
    courseId: {
      optional: true
    },
    classId: {
      optional: true
    },
    forumId: {
      optional: true
    }
  };

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkBody(bodySchema);
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
 * Check for typeId
 * 1-community, 2-forum
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function checkTypeId (req, res, next) {
  let typeId = req.$params.typeId;
  let courseId = req.$params.courseId;
  let classId = req.$params.classId;
  let forumId = req.$params.forumId;

  if (typeId === 1 && lib.isNull(courseId)) {
    req.log.error({
      err: 'Missing Resource: Course Id'
    }, 'checkTypeId Error - post-brainstorming');

    return res.status(400)
    .send(new lib.rpc.ValidationError({
      msg: 'Missing Resource: Course Id'
    }));
  } else if (typeId === 1 && lib.isNull(classId)) {
    req.log.error({
      err: 'Missing Resource: Class Id'
    }, 'checkTypeId Error - post-brainstorming');

    return res.status(400)
    .send(new lib.rpc.ValidationError({
      msg: 'Missing Resource: Class Id'
    }));
  } else if (typeId === 2 && lib.isNull(forumId)) {
    req.log.error({
      err: 'Missing Resource: Forum Id'
    }, 'checkTypeId Error - post-brainstorming');

    return res.status(400)
    .send(new lib.rpc.ValidationError({
      msg: 'Missing Resource: Forum Id'
    }));
  }

  return next();
}

/**
 * This would be the fallback if the token exist
 * @see {@link lib/isTokenExist}
 * @see isTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postBrainstorming (req, res, next) {
  let user = req.$scope.user;
  let typeId = req.$params.typeId;
  let topicName = req.$params.topicName;
  let forumId = req.$params.forumId;
  let classId = req.$params.classId;

  return req.db.brainstorming.create({
    userId: user.id,
    typeId: typeId,
    topicName: topicName,
    forumId: forumId,
    classId: classId
  })
  .then(brainstorming => {
    req.$scope.brainstorming = brainstorming;
    next();
    return brainstorming;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'brainstorming.create Error - post-brainstorming');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let brainstorming = req.$scope.brainstorming;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    brainstorming: brainstorming
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.checkTypeId = checkTypeId;
module.exports.logic = postBrainstorming;
module.exports.response = response;
