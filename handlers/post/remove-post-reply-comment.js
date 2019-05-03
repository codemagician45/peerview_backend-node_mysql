'use strict';

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
    replyId: {
      isInt: {
        errorMessage: 'Invalid Resource: Reply Id'
      }
    }
  };

  req.checkParams(paramsSchema);
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

const removePostReply = (req, res, next) => {
  let user = req.$scope.user;
  let replyId = req.params.replyId;

  return req.db.postReply.destroy({
    where: {
      id: {
        [req.Op.eq]: replyId
      },
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then((reply) => {
    next();
    return reply;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post remove-post-reply-comment [reply.destroy] - Error');

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
  let post = req.$scope.post;
  let body = lib.response.createOk(post);

  res.status(lib.httpCodes.OK).send(body);
};

module.exports.validateParams = validateParams;
module.exports.logic = removePostReply;
module.exports.response = response;
