'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Reply
 */

const lib = require('../../lib');

/**
 * Initialized the schema Object
 */
const querySchema = {
  postId: { in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: Post Id'
    }
  },
  comment: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Comment'
    },
    isLength: {
      options: [{
        min: 1,
        max: 500
      }],
      errorMessage: `Invalid Resource: Minimum 1 and maximum 500 characters are allowed`
    }
  },
  tagUserId: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Tag User Id'
    }
  },
  quoteReplyId: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Quote Reply Id'
    }
  },
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
function postPostReply (req, res, next) {
  let user = req.$scope.user;
  let postId = req.params.postId;
  let comment = req.$params.comment;
  let tagUserId = req.$params.tagUserId;
  let quoteReplyId = req.$params.quoteReplyId;

  return req.db.reply.create({
    postv1Id: postId,
    userId: user.id,
    comment: comment,
    tagUserId: tagUserId,
    quoteReplyId: quoteReplyId
  })
  .then(reply => {
    reply.newId = `${reply.id}reply`;
    reply.credits = 1;
    req.$scope.userCredits = reply;
    req.$scope.userId = user.id;
    req.$scope.replyId = reply.id;
    next();
    return reply;
  })
  .catch((error) => {
    req.log.error({
      error: error
    }, 'handlers.post post-post-v1-reply [reply.create] - Error');

    return res.status(lib.httpCodes.SERVER_ERROR)
    .send(new lib.rpc.InternalError(error));
  });
}
function saveAttachments (req, res, next) {
  let postv1 = req.$scope.replyId;
  let cloudinary = req.$params.attachments
    ? req.$params.attachments : [];
  let attachments = [];

  if (cloudinary.length === 0) {
    return next();
  }

  cloudinary.forEach(item => {
    attachments.push({
      replyId: postv1,
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
module.exports.logic = postPostReply;
module.exports.saveAttachments = saveAttachments;
module.exports.response = response;
