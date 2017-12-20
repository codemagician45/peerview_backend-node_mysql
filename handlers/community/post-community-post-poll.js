'use strict';

/**
 * @author Jo-Ries Canino
 * @description Community Post Poll
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
    communityId: {
      isInt: {
        errorMessage: 'Invalid Resource: Community Id'
      }
    }
  };

  let bodySchema = {
    question: {
      notEmpty: {
        errorMessage: 'Missing Resource: Question'
      }
    },
    options: {
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Options'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Options'
      }
    },
    duration: {
      notEmpty: {
        errorMessage: 'Missing Resource: Duration'
      },
      isInt: {
        errorMessage: 'Invalid Resource: Duration'
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

/**
 * This would be the fallback if the user existed
 * In which if the user is still unverified
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postCommunityPostPoll (req, res, next) {
  let user = req.$scope.user;
  let question = req.$params.question;
  let duration = req.$params.duration;

  return req.db.communityPoll.create({
    question: question,
    duration: duration,
    userId: user.id
  })
  .then(communityPoll => {
    req.$scope.communityPoll = communityPoll;
    next();
    return communityPoll;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'communityPoll.create Error - post-community');
  });
}

/**
 * Save the options in the pollOption table
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function saveCommunityPollOption (req, res, next) {// eslint-disable-line id-length
  let communityPoll = req.$scope.communityPoll;
  let options = JSON.parse(req.$params.options);
  let communityPollOption = [];

  options.forEach(option => {
    communityPollOption.push({
      name: option,
      communityPollId: communityPoll.id
    });
  });

  return req.db.communityPollOption.bulkCreate(communityPollOption)
  .then(communityPollOption => {
    next();
    return communityPollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'communityPollOption.create Error - post-community-poll');
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
module.exports.logic = postCommunityPostPoll;
module.exports.saveCommunityPollOption = saveCommunityPollOption;
module.exports.response = response;
