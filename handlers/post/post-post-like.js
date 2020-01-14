'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Like
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
      isInt: {
        errorMessage: 'Invalid Resource: Post Id'
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
function postPostLike (req, res, next) {
  let user = req.$scope.user;
  let postId = req.$params.postId;

  req.db.postLike.findAll({
    where: {
      [req.Op.and]: {
        userId: user.id,
        postId: postId
      }
    }
  }).then(rates => {
    if(rates.length <= 0) {
      return req.db.postLike.create({
        postId: postId,
        userId: user.id
      })
      .then(postLike => {
        next();
        return postLike;
      })
      .catch(error => {
        res.status(500)
        .send(new lib.rpc.InternalError(error));
    
        req.log.error({
          err: error.message
        }, 'postLike.create Error - post-post-like');
      });
    } else {
      next();
      return rates[0];
    }
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-like [like.create] - Error');
    return res.status(lib.httpCodes.SERVER_ERROR)
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
function getPost (req, res, next) {
  let user = req.$scope.user;
  let postId = req.$params.postId;
  const sequelize = req.db.postRating.sequelize;
  const colRating = sequelize.col(['postRating', 'rating'].join('.'));
  const colAVG = sequelize.fn('AVG', colRating);

  return req.db.post.findAll({
    attributes: [
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
        sequelize.fn('DISTINCT', sequelize.where(sequelize.col('postShare.id')))),
      'isUserPostShare'],
      [sequelize.where(sequelize.col('post.userId'), user.id), 'isPostUser']
    ],
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
      attributes: [],
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
      attributes: []
    }],
    group: ['id'],
    where: {
      id: {
        [req.Op.eq]: postId
      }
    }
  })
  .then((posts) => {
    return req.db.post.prototype.getPOSTREPLY(posts, req.db)
    .then(() => req.db.post.prototype.getATTACHMENTS(posts))
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
    return req.db.post.prototype.isUserPostLike(posts, req.db, user.id);
  })
  .then((posts) => {
    req.$scope.updatedPost = posts[0];
    next();
    return posts;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.findAll Error - get-post');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let data = req.$scope.updatedPost;

  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    data: data
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postPostLike;
module.exports.getPost = getPost;
module.exports.response = response;
