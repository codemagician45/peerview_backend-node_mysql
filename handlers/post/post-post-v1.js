'use strict';

/**
 * @author Jo-Ries Canino
 * @description Community Post
 * It is also tied in our private community
 * So reused the communityPost table
 * and just add the communityId
 * which include the ffg:
 * communityId
 * message
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  courseId: { in: ['params'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Course Id'
    }
  },
  communityId: { in: ['params'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Community Id'
    }
  },
  message: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Message'
    }
  },
  area: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Area'
    },
    isIn: {
      options: [['home', 'campus', 'community']],
      errorMessage: 'Invalid Resource: Area'
    }
  },
  type: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Type'
    },
    isIn: {
      options: [['post', 'poll', 'career']],
      errorMessage: 'Invalid Resource: Type'
    }
  },
  attachments: { in: ['body'],
    optional: true,
  }
};

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
function postCommunityPost (req, res, next) {
  let user = req.$scope.user;
  let courseId = req.params.courseId;
  let communityId = req.params.communityId;
  let message = req.$params.message;
  let area = req.$params.area;
  let type = req.$params.type;

  return req.db.postv1.create({
    userId: user.id,
    courseId: courseId,
    communityId: communityId,
    message: message,
    area: area,
    type: type
  })
  .then(postv1 => {
    req.$scope.postv1 = postv1;
    // below are use for user credits
    postv1.newId = `${postv1.id}${area}${type}`;
    postv1.credits = 1;
    req.$scope.userCredits = postv1;
    req.$scope.userId = user.id;
    next();
    return postv1;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'handlers.post post-post-v1 [postv1.create] - Error');
  });
}

function saveAttachments (req, res, next) {
  let postv1 = req.$scope.postv1;
  let cloudinary = req.$params.attachments
    ? req.$params.attachments : [];
  let attachments = [];

  if (cloudinary.length === 0) {
    return next();
  }

  cloudinary.forEach(item => {
    attachments.push({
      postv1Id: postv1.id,
      cloudinaryPublicId: item.cloudinaryPublicId,
      usage: item.usage
    });
  });

  return req.db.attachment.bulkCreate(attachments)
  .then(attachment => {
    next();
    return attachment;
  })
  .catch(error => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-v1 [attachment.bulkCreate] - Error');

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
  let body = lib.response.created();

  res.status(lib.httpCodes.CREATED).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postCommunityPost;
module.exports.saveAttachments = saveAttachments;
module.exports.response = response;
