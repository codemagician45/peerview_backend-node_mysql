'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Post Events
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
    eventId: {
      isInt: {
        errorMessage: 'Invalid Resource: Event Id'
      }
    },
    offset: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Offset'
      }
    },
    limit: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Limit'
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

function getEventPosts (req, res, next) {
  let eventId = req.$params.eventid;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  const sequelize = req.db.eventPostRating.sequelize;
  const colRating = sequelize.col('postRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.eventPost.findAll({
    attributes: [
      'message',
      'createdAt',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['postRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postPageview', 'userId'].join('.'))), 'pageviewCount']
    ],
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName']
    }, {
      model: req.db.eventPostRating,
      as: 'postRating',
      attributes: []
    }, {
      model: req.db.eventPostLike,
      as: 'postLike',
      attributes: []
    }, {
      model: req.db.eventPostReply,
      as: 'postReply',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }, {
      model: req.db.eventPostPageview,
      as: 'postPageview',
      attributes: []
    }, {
      model: req.db.attachment,
      attributes: ['id', 'usage', 'cloudinaryPublicId']
    }],
    group: ['eventPost.id'],
    where: {
      id: {
        [req.Op.eq]: eventId
      }
    },
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(eventPosts => {
    req.$scope.eventPosts = eventPosts;
    next();
    return eventPosts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'eventPost.findAll Error - get-event-posts');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let eventPosts = req.$scope.eventPosts;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: eventPosts
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getEventPosts;
module.exports.response = response;
