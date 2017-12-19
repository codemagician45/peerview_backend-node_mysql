'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Community Post
 * Basically same userType
 * and same userStudyLevel for student
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
      optional: true // because to reuse the general tab and when the user browse in the courses(student); professionals can browse all
    },
    userStudyLevelId: {// when the professionals browse it so we need it as an optional params
      optional: true
    },
    communityId: {// use for private communities
      optional: true
    },
    offset: {
      optional: true
    },
    limit: {
      optional: true
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
        err: error
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
      err: error
    }, 'userType.findOne Error - get-community-posts');
  });
}

function getCommunityPosts (req, res, next) {
  let user = req.$scope.user;
  let userType = req.$scope.userType;
  let professionalsUserType = req.$scope.professionalsUserType;// eslint-disable-line id-length
  let courseId = req.$params.courseId;
  let userStudyLevelId = req.$params.userStudyLevelId;
  let communityId = req.$params.communityId;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  const sequelize = req.db.communityPostRating.sequelize;
  const colRating = sequelize.col('communityPostRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);
  let where = {// meaning professionals can access it;
    courseId: typeof courseId === 'undefined' ? null : courseId,
    userStudyLevelId: typeof userStudyLevelId === 'undefined' ? null : userStudyLevelId,
  };

  if (userType.code === 'student' && (typeof communityId === 'undefined')) {// get also the post of a professionals
    where = {
      [req.Op.and]: {
        [req.Op.or]: [{
          userStudyLevelId: user.userStudyLevelId
        }, {
          userTypeId: professionalsUserType.id// this is where we get the post from the professionals
        }],
        communityId: null,
        courseId: typeof courseId === 'undefined' ? null : courseId
      }
    };
  } else if (typeof communityId !== 'undefined') {// we are on the private community request
    where = {
      communityId: {
        [req.Op.eq]: communityId
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
    offset: !offset ? 0 : offset,
    limit: !limit ? 10 : limit
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
      err: error
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
module.exports.response = response;
