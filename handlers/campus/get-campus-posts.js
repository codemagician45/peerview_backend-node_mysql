/*eslint-disable max-len*/
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
    isTimeline: {
      optional: true,
      isBoolean: {
        errorMessage: 'Invalid Resource: isTimeline'
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
    clubId: {// use in society-club
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Society Club Id'
      }
    },
    groupId: {// use in student group
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Student Group Id'
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
  let user = req.$scope.user;
  let campusId = req.$params.campusId;
  let courseId = req.$params.courseId;
  let classId = req.$params.classId;
  let freshersFeedId = req.$params.freshersFeedId;
  let clubId = req.$params.clubId;
  let studentGroupId = req.$params.groupId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  let isTimeline = req.$params.isTimeline;
  const sequelize = req.db.campusPostRating.sequelize;
  const colRating = sequelize.col('postRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);

  let where = {
    campusId: campusId || null,
    courseId: courseId || null,
    campusCourseClassId: classId || null,
    campusFreshersFeedId: freshersFeedId || null,
    campusSocietyClubId: clubId || null,
    campusStudentGroupId: studentGroupId || null
  };

  if (classId && isTimeline) {
    let additionalQuery = {
      [req.Op.and]: {
        question: {
          [req.Op.eq]: null
        },
        duration: {
          [req.Op.eq]: null
        }
      }
    };

    where = Object.assign(where, additionalQuery);
  } else if (classId) {// we are in the question tab rather than in the timeline tab
    let additionalQuery = {
      [req.Op.and]: {
        question: {
          [req.Op.ne]: null
        },
        duration: {
          [req.Op.ne]: null
        }
      }
    };

    where = Object.assign(where, additionalQuery);
  }

  return req.db.campusPost.findAll({
    attributes: {
      include: [
        'id',
        'message',
        'createdAt',
        [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postRating.id'))), 'ratingCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postReply.id'))), 'postReplyCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postLike.id'))), 'likeCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postLike.id'))), 'pageviewCount'],
        [sequelize.fn('COUNT',
          sequelize.fn('DISTINCT', sequelize.where(sequelize.col('postLike.userId'), user.id))), //check this if it is working or not
        'isUserPostLike'],
        [sequelize.where(sequelize.col('campusPost.userId'), user.id), 'isPostUser']
      ]
    },
    include: [{
      model: req.db.user,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture', 'socialImage'],
      include: [{
        model: req.db.userCredits,
        attributes: [
          [sequelize.fn('SUM',
            sequelize.col('credits')), 'totalCredits'],
        ],
      }]
    }, {
      model: req.db.campusPostRating,
      as: 'postRating',
      attributes: []
    }, {
      model: req.db.campusPostLike,
      as: 'postLike',
      attributes: []
    }, {
      model: req.db.campusPostReply,
      as: 'postReply',
      attributes: []
    }, {
      model: req.db.campusPostPageview,
      as: 'postPageview',
      attributes: []
    }, {
      model: req.db.attachment,
      attributes: ['id', 'cloudinaryPublicId']
    }, {
      model: req.db.campusPostPollOption,
      as: 'postPollOption',
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
  .then((campusPosts) => {
    return req.db.campusPost.prototype.getPOSTREPLY(campusPosts, req.db)
    .then(() => req.db.campusPost.prototype.getATTACHMENTS(campusPosts))
    .then(() => req.db.campusPost.prototype.getPOSTPOLLOPTIONS(campusPosts, req.db))
    .then(() => req.db.campusPost.prototype.getPOSTLIKES(campusPosts, req));
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
    data: campusPosts
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = getCampusPosts;
module.exports.response = response;
