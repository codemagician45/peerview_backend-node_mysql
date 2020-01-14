'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get Post Rating
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
    postId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Post Id Params'
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
function getPostRating (req, res, next) {
  let postId = req.$params.postId;
  const sequelize = req.db.postRating.sequelize;
  const colRating = sequelize.col('rating');
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.postRating.findOne({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('userId')), 'ratingCount'],
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating']
    ],
    where: {
      postId: {
        [req.Op.eq]: postId
      }
    }
  })
  .then(postRating => {
    req.$scope.postRating = postRating;
    next();
    return postRating;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postRating.findAll Error - get-post-rating');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let postRating = req.$scope.postRating;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: postRating
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getPostRating;
module.exports.response = response;
