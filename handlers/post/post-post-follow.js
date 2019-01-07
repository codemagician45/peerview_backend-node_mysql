'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Follow
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  courseId: { in: ['body'],
    isInt: {
      errorMessage: 'Invalid Resource: Course Id'
    }
  },
  postId: { in: ['body'],
    isInt: {
      errorMessage: 'Invalid Resource: Post Id'
    }
  }
};

const postPostFollow = (req, res, next) => {// eslint-disable-line id-length
  let user = req.$scope.user;
  let courseId = req.$params.courseId;
  let postId = req.$params.postId;

  return req.db.followPost.create({
    postv1Id: postId,
    courseId: courseId,
    userId: user.id
  })
  .then(followPost => {
    next();
    return followPost;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-follow [followPost.create] - Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
};

const response = (req, res) => {
  let body = lib.response.created();

  res.status(lib.httpCodes.CREATED).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postPostFollow;
module.exports.response = response;
