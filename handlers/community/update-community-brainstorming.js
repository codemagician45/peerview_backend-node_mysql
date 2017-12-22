'use strict';

/**
 * @author Jo-Ries Canino
 * @description Create Brainstorming Map
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
  let paramsSchema = {
    brainstormingId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Brainstorming Id'
      }
    }
  };

  let bodySchema = {
    jsonData: {
      notEmpty: {
        errorMessage: 'Missing Resource: JSON Data'
      },
      isJSON: {
        errorMessage: 'Invalid Resource: JSON Data'
      }
    }
  };

  req.checkParams(paramsSchema);
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

function updateCommunityBrainstorming (req, res, next) {// eslint-disable-line id-length
  let brainstormingId = req.$params.brainstormingId;
  let jsonData = req.$params.jsonData;

  return req.db.communityBrainstorming.update({
    jsonData: jsonData
  }, {
    where: {
      id: {
        [req.Op.eq]: brainstormingId
      }
    }
  })
  .then(communityBrainstorming => {// eslint-disable-line id-length
    next();
    return communityBrainstorming;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'communityBrainstorming.create Error - post-community-brainstorming');
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
module.exports.logic = updateCommunityBrainstorming;
module.exports.response = response;
