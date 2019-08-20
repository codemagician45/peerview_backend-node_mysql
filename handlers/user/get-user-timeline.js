/*eslint-disable max-len*/
'use strict';

/**
 * Basically this feature is getting the post of current
 * Log-in user from the home and community menu
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
    },
    userId: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: User Id'
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

function getPosts (req, res, next) {
  /**
   * Basically check if we have req.$params.userId
   * if we are getting timeline of a certain user
   * or getting the timeline of particular userId
   */
  let userId = req.$params.userId || req.$scope.user.id;
  let offset = lib.utils.returnValue(req.$params.offset);
  let limit = lib.utils.returnValue(req.$params.limit);
  const sequelize = req.db.postRating.sequelize;
  const colRating = sequelize.col('postRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);
  let user = req.$scope.user;

  return req.db.post.findAll({
    attributes: {
      include: [
        'id',
        'message',
        'title',
        'createdAt',
        [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postRating.id'))), 'ratingCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postReply.id'))), 'postReplyCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postLike.id'))), 'likeCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postPageview.id'))), 'pageviewCount'],
        [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('postShare.id'))), 'shareCount'],
        [sequelize.fn('COUNT',
          sequelize.fn('DISTINCT', sequelize.where(sequelize.col('postLike.userId'), userId))), //check this if it is working or not
        'isUserPostLike'],
        [sequelize.fn('COUNT',
          sequelize.fn('DISTINCT', sequelize.where(sequelize.col('postShare.userId'), userId))), //check this if it is working or not
        'isUserPostShare'],
        [sequelize.where(sequelize.col('post.userId'), userId), 'isPostUser']
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
      model: req.db.postRating,
      as: 'postRating',
      attributes: []
    }, {
      model: req.db.postLike,
      as: 'postLike',
      attributes: []
    }, {
      model: req.db.postReply,
      as: 'postReply',
      attributes: []
    }, {
      model: req.db.postPageview,
      as: 'postPageview',
      attributes: []
    }, {
      model: req.db.post,
      foreignKey: 'sharePostId',
      as: 'postShare',
      attributes: []
    }, {
      model: req.db.attachment,
      attributes: ['id', 'cloudinaryPublicId']
    }, {
      model: req.db.postPollOption,
      attributes: [],
      as: 'postPollOption'
    }],
    where: {
      [req.Op.or]: [{
        userId: {
          [req.Op.eq]: userId
        }
      }, {
        postTo: {
          [req.Op.eq]: userId
        }
      }]
    },
    group: ['post.id'],
    order: [['createdAt', 'DESC']],
    subQuery: false,
    offset: !offset ? 0 : parseInt(offset),
    limit: !limit ? 10 : parseInt(limit)
  })
  .then((posts) => {
    return req.db.post.prototype.getPOSTREPLY(posts, req.db)
    .then(() => req.db.post.prototype.getATTACHMENTS(posts))
    .then(() => req.db.post.prototype.getPOSTPOLLOPTIONS(posts, req.db))
    .then(() => req.db.post.prototype.getPOSTLIKES(posts, req));
  }).then(async (posts) => {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await req.db.postReply.prototype.isUserPostReplyLike(post.dataValues.postReply, req.db, user.id);
      post.dataValues.postReply = contents;
      return post;
    }));
    return posts;
  })
  .then(async (posts) => {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await req.db.postReply.prototype.isUserPostReplyRating(post.dataValues.postReply, req.db, user.id);
      post.dataValues.postReply = contents;
      return post;
    }));
    return posts;
  })
  .then((posts) => {
    req.$scope.posts = posts;
    next();
    return posts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.findAll Error - get-user-timeline');
  });
}

function getCommunityPosts (req, res, next) { // eslint-disable-line id-length
  /**
   * Basically check if we have req.$params.userId
   * if we are getting timeline of a certain user
   * or getting the timeline of particular userId
   */
  let userId = req.$params.userId || req.$scope.user.id;
  let offset = req.$params.offset;
  let limit = req.$params.limit;
  const sequelize = req.db.communityPostRating.sequelize;
  const colRating = sequelize.col('postRating.rating');
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.communityPost.findAll({
    attributes: [
      'id',
      'message',
      'title',
      'createdAt', [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT',
        sequelize.col(['postRating', 'userId'].join('.'))), 'ratingCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postLike', 'userId'].join('.'))), 'likeCount'],
      [sequelize.fn('COUNT',
        sequelize.col(['postPageview', 'userId'].join('.'))), 'pageviewCount'],
      [sequelize.fn('COUNT',
        sequelize.where(sequelize.col(['postLike', 'userId'].join('.')), userId)),
      'isUserPostLike']
    ],
    include: [{
      model: req.db.user,
      attributes: ['id', 'firstName', 'lastName', 'email', 'schoolName', 'profilePicture']
    }, {
      model: req.db.communityPostRating,
      as: 'postRating',
      attributes: []
    }, {
      model: req.db.communityPostLike,
      as: 'postLike',
      attributes: []
    }, {
      model: req.db.communityPostPageview,
      as: 'postPageview',
      attributes: []
    }, {
      model: req.db.communityPostReply,
      as: 'postReply',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    }, {
      model: req.db.attachment,
      attributes: ['id', 'usage', 'cloudinaryPublicId']
    }],
    where: {
      [req.Op.and]: {
        communityId: {
          [req.Op.eq]: null
        },
        userId: {
          [req.Op.eq]: userId
        }
      }
    },
    group: ['communityPost.id', 'postReply.id'],
    order: [
      ['createdAt', 'DESC']
    ],
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
    }, 'communityPosts.findAll Error - get-user-timeline');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let posts = req.$scope.posts;
  // let communityPosts = req.$scope.communityPosts;
  // posts = posts.concat(communityPosts);
  // _.orderBy(posts, ['createdAt'], ['desc']);

  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: posts
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.getPosts = getPosts;
module.exports.getCommunityPosts = getCommunityPosts;
module.exports.response = response;