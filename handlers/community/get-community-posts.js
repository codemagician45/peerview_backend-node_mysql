'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Community Post
 * General Post is tied with the
 * user study level
 *
 * If the user is a professional he/she can browse
 * any userStudyLevel
 *
 * If the post is a professional the student userType
 * can see the post.
 *
 * It is also tied in our private community
 * So reused the communityPost table
 * and just add the communityId
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
    courseId: {
      optional: true, // because to reuse the general tab and when the user browse in the courses(student); professionals can browse all
      isInt: {
        errorMessage: 'Invalid Resource: Course Id'
      }
    },
    userStudyLevelId: {
      optional: true, // getting all career's
      isInt: {
        errorMessage: 'Invalid Resource: User Study Level Id'
      }
    },
    communityId: {// use for private communities
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Community Id'
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
function checkUserType (req, res, next) {
  let user = req.$scope.user;
  if (user.userTypeId) {
    // check if the userTypeId data code='student'
    return req.db.userType.findOne({
      where: {
        id: user.userTypeId
      }
    })
    .then(userType => {
      req.$scope.userType = userType;
      next();
      return userType;
    })
    .catch(error => {
      res.status(500)
      .send(new lib.rpc.InternalError(error));

      req.log.error({
        err: error.message
      }, 'userType.findOne Error - get-community-posts');
    });
  } else {
    return res.status(400).send({
      status: 'ERROR',
      status_code: 101,
      status_message: 'Missing Resource: userTypeId',
      http_code: 400
    });
  }
}

function getProfessionalsUserTypeId (req, res, next) {// eslint-disable-line id-length
  return req.db.userType.findOne({
    where: {
      code: 'professionals'
    }
  })
  .then(professionalsUserType => {//eslint-disable-line id-length
    req.$scope.professionalsUserType = professionalsUserType;
    next();
    return professionalsUserType;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userType.findOne Error - get-community-posts');
  });
}

function getPrivateCommunityPosts (req, res, next) {// eslint-disable-line id-length
  let communityId = req.$params.communityId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  const sequelize = req.db.communityPostRating.sequelize;
  const colRating = sequelize.col('communityPostRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.communityPost.findAll({
    attributes: [
      'message',
      'createdAt',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostPageview', 'userId'].join('.'))), 'pageviewCount']
    ],
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email']
    }, {
      model: req.db.communityPostRating,
      as: 'communityPostRating',
      attributes: []
    }, {
      model: req.db.communityPostLike,
      as: 'communityPostLike',
      attributes: []
    }, {
      model: req.db.communityPostPageview,
      as: 'communityPostPageview',
      attributes: []
    }, {
      model: req.db.communityPostReply,
      as: 'communityPostReply',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }],
    group: ['communityPost.id'],
    where: {
      communityId: {
        [req.Op.eq]: communityId
      }
    },
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(communityPosts => {
    req.$scope.communityPosts = communityPosts;
    next();
    return communityPosts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postLike.create Error - get-community-posts');
  });
}

function getCommunityPosts (req, res, next) {
  let user = req.$scope.user;
  let userType = req.$scope.userType;
  let professionalsUserType = req.$scope.professionalsUserType;// eslint-disable-line id-length
  let courseId = req.$params.courseId;
  let userStudyLevelId = req.$params.userStudyLevelId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  let isCareerUrl = req.url.indexOf('/community/career/posts');
  const sequelize = req.db.communityPostRating.sequelize;
  const colRating = sequelize.col('communityPostRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);
  let where = {// meaning professionals can access it;
    courseId: courseId || null,
    userStudyLevelId: userStudyLevelId || null
  };

  if (userType && userType.code === 'student' && isCareerUrl === -1) {// get also the post of a professionals
    where = {
      [req.Op.and]: {
        [req.Op.or]: [{
          userStudyLevelId: user.userStudyLevelId // general post is tied with this one
        }, {
          userTypeId: professionalsUserType.id// this is where we get the post from the professionals
        }],
        communityId: null,
        courseId: courseId || null
      }
    };
  } else {
    // get all the career's here
    where = {
      [req.Op.and]: {
        title: {
          [req.Op.ne]: null
        },
        description: {
          [req.Op.ne]: null
        }
      }
    };
  }

  return req.db.communityPost.findAll({
    attributes: [
      'message',
      'createdAt',
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['communityPostPageview', 'userId'].join('.'))), 'pageviewCount']
    ],
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email']
    }, {
      model: req.db.communityPostRating,
      as: 'communityPostRating',
      attributes: []
    }, {
      model: req.db.communityPostLike,
      as: 'communityPostLike',
      attributes: []
    }, {
      model: req.db.communityPostPageview,
      as: 'communityPostPageview',
      attributes: []
    }, {
      model: req.db.communityPostReply,
      as: 'communityPostReply',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }],
    group: ['communityPost.id'],
    where: where,
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then(communityPosts => {
    req.$scope.communityPosts = communityPosts;
    next();
    return communityPosts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postLike.create Error - get-community-posts');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let communityPosts = req.$scope.communityPosts;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    communityPosts: communityPosts
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.checkUserType = checkUserType;
module.exports.getProfessionalsUserTypeId = getProfessionalsUserTypeId;
module.exports.logic = getCommunityPosts;
module.exports.getPrivateCommunityPosts = getPrivateCommunityPosts;
module.exports.response = response;
