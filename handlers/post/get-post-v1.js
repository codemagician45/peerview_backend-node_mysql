/*eslint-disable max-len*/
'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get List of Posts
 */

const lib = require('../../lib');
// const moment = require('moment');

/**
 * Initialized the schema Object
 */
const querySchema = {
  postId: { in: ['params'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Post Id'
    }
  },
  communityId: { in: ['params'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Community Id'
    }
  },
  courseId: { in: ['params'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Course Id'
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
function getPost (req, res, next) {
  let user = req.$scope.user;
  let postId = req.params.postId;
  let communityId = lib.utilities.assignNullIfUndefined(req.params.communityId);
  let courseId = req.params.courseId ? lib.utilities.assignNullIfUndefined(req.params.courseId) : lib.utilities.assignNullIfUndefined(req.$params.courseId);
  const sequelize = req.db.postv1.sequelize;
  const colRating = sequelize.col('rating');
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.postv1.findOne({
    attributes: [
      'id',
      'message',
      'title',
      'description',
      'question',
      'duration',
      'expiration',
      [sequelize.where(sequelize.col('postv1.userId'), user.id), 'isPostUser'],
      [sequelize.where(sequelize.col('postv1.sharePostId'), user.id), //check this if it is working or not
        'isUserPostShare'],
      [sequelize.fn('ROUND', colAVG, 2), 'roundedRating'],
      [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('share.id'))), 'shareCount'],
      [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('rating.id'))), 'likeCount'],
      [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('countReplyVirtual.id'))), 'replyCount'],
    ],
    include: [{
      model: req.db.user,
      as: 'user'
    }, {
      model: req.db.rating,
      as: 'rating',
      attributes: []
    }, {
      model: req.db.reply,
      as: 'reply',
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{
        model: req.db.user,
        attributes: ['id', 'firstName', 'lastName', 'email', 'socialImage', 'profilePicture', 'institutionName', 'schoolName']
      }, {
        model: req.db.like,
        as: 'replyLike',
        attributes: [
          // [sequelize.fn('COUNT', sequelize.col('replyLike.id')), 'replyCount']
        ],
        raw: true
      }]
    }, {
      model: req.db.reply,
      as: 'countReplyVirtual',
      attributes: []
    }, {
      model: req.db.pageview,
      as: 'pageview',
      attributes: []
    }, {
      model: req.db.postv1,
      as: 'share',
      attributes: []
    }, {
      model: req.db.postv1,
      as: 'originalPost'
    }, {
      model: req.db.attachment,
      attributes: ['id', 'cloudinaryPublicId']
    }, {
      model: req.db.pollOption,
      attributes: []
    }],
    where: {
      id: {
        [req.Op.eq]: postId
      },
      communityId: {
        [req.Op.eq]: communityId
      },
      courseId: {
        [req.Op.eq]: courseId
      }
    },
    group: ['id'],
    subQuery: false,
  })
  .then((post) => {
    req.$scope.post = post;
    next();
    return post;
  })
  .catch(error => {
    req.log.error({
      error: error
    }, 'handlers.post get-post-v1 [postv1.findOne] Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
}

function getfollow (req, res, next) {
  let user = req.$scope.user;
  let postId = req.params.postId;
  return req.db.followPost.findOne({
    where: {
      postv1Id: postId,
      userId: user.id
    }
  })
  .then((follow) => {
    req.$scope.follow = follow;
    next();
    return follow;
  })
  .catch(error => {
    req.log.error({
      error: error
    }, 'handlers.post get-post-v1 [postv1.findOne] Error');

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
  let post = req.$scope.post;
  let follow = req.$scope.follow;
  let body = lib.response.createOk(post);
  if(follow){
    body.isUserFollowCommunityQuestion = true;
  }else{
    body.isUserFollowCommunityQuestion = false;
  }
  res.status(lib.httpCodes.OK).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = getPost;
module.exports.followlogic = getfollow;
module.exports.response = response;
