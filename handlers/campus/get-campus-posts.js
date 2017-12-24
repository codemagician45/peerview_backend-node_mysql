'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Posts
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
    campusId: {
      isInt: {
        errorMessage: 'Missing Resource: Campus Id'
      }
    },
    courseId: {
      optional: true,
      isInt: {
        errorMessage: 'Missing Resource: Course Id'
      }
    },
    classId: {
      optional: true,
      isInt: {
        errorMessage: 'Missing Resource: Campus Course Class Id'
      }
    },
    freshersFeedId: {
      optional: true,
      isInt: {
        errorMessage: 'Missing Resource: Campus Freshers Feed Id'
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

function getCampusPosts (req, res, next) {
  let campusId = req.$params.campusId;
  let courseId = req.$params.courseId;
  let classId = req.$params.classId;
  let freshersFeedId = req.$params.freshersFeedId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  const sequelize = req.db.campusPostRating.sequelize;
  const colRating = sequelize.col([req.db.campusPostRating.name, 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);
  let where = {
    campusId: campusId || null,
    courseId: courseId || null,
    campusCourseClassId: classId || null,
    campusFreshersFeedId: freshersFeedId || null
  };

  return req.db.campusPost.findAll({
    attributes: [
      'message',
      'createdAt',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['campusPostRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['campusPostLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['campusPostPageview', 'userId'].join('.'))), 'pageviewCount']
    ],
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName']
    }, {
      model: req.db.campusPostRating,
      as: 'campusPostRating',
      attributes: []
    }, {
      model: req.db.campusPostLike,
      as: 'campusPostLike',
      attributes: []
    }, {
      model: req.db.campusPostReply,
      as: 'campusPostReply',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }, {
      model: req.db.campusPostPageview,
      as: 'campusPostPageview',
      attributes: []
    }],
    group: ['campusPost.id'],
    order: [['createdAt', 'DESC']],
    where: {
      [req.Op.and]: where
    },
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(campusPosts => {
    req.$scope.campusPosts = campusPosts;
    next();
    return campusPosts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPost.findAll Error - get-campus-posts');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusPosts = req.$scope.campusPosts;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    campusPosts: campusPosts
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusPosts;
module.exports.response = response;
