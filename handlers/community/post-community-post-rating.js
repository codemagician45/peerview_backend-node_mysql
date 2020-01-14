'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Rating
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
    communityPostId: {
      isInt: {
        errorMessage: 'Invalid Resource: Community Post Id'
      }
    }
  };

  let bodySchema = {
    rating: {
      notEmpty: {
        errorMessage: 'Missing Resource: Rating'
      },
      isFloat: {
        errorMessage: 'Invalid Resource: Rating'
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
function postCommunityPostRating (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let communityPostId = req.$params.communityPostId;
  let rating = req.$params.rating;

  return req.db.communityPostRating.create({
    communityPostId: communityPostId,
    userId: user.id,
    rating: rating
  })
  .then(communityPostRating => {
    next();
    return communityPostRating;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPostRating.create Error - post-community-post-rating');
  });
}

// check the average count of the rating
function averageRating (req, res, next) {
  let communityPostId = req.$params.communityPostId;
  const sequelize = req.db.communityPostRating.sequelize;
  const colRating = sequelize.col([req.db.communityPostRating.name, 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.communityPost.findAll({
    attributes: [
      'id',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating']
    ],
    include: [{
      model: req.db.communityPostRating,
      as: 'postRating',
      attributes: []
    }],
    group: ['communityPost.id'],
    where: {
      id: {
        [req.Op.eq]: communityPostId
      }
    }
  })
  .then(communityPost => {
    communityPost.length !== 0
    && communityPost[0]
    && (communityPost[0].newId = communityPost[0].id + '_communityPostRating');
    req.$scope.post = communityPost[0];// use for updating credits
    next();
    return communityPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPost.findAll Error - post-community-post-rating');
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
module.exports.logic = postCommunityPostRating;
module.exports.averageRating = averageRating;
module.exports.response = response;
