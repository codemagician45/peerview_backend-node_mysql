'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Report
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  postId: { in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: Post Id'
    }
  },
  reason: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Reason'
    }
  }
};

/**
 * This would be the fallback if the user existed
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postPostReport (req, res, next) {
  let user = req.$scope.user;
  let reason = req.$params.reason;
  let postId = req.params.postId;

  return req.db.report.create({
    reportBy: user.id,
    postv1Id: postId,
    reason: reason
  })
  .then(report => {
    next();
    return report;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-report-v1 [report.create] - Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
const response = (req, res) => {
  let body = lib.response.created();

  res.status(lib.httpCodes.CREATED).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postPostReport;
module.exports.response = response;
