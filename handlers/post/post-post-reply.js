'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post Reply
 */

const lib = require('../../lib');
const crypto = require('../../lib/crypto');

/**
 * Initialized the schema Object
 */
const querySchema = {
  postId: { in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: Post Id'
    }
  },
  recipientId: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Recipient Id'
    }
  },
  quoteReplyId: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Quote Reply Id'
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
  postPollOptionId: { in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Invalid Resource: Post Poll Option Id'
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
function postPostReply (req, res, next) {
  let user = req.$scope.user;
  let postId = req.params.postId;
  let postPollOptionId = req.$params.postPollOptionId;
  let comment = req.$params.comment;
  let quoteReplyId = req.$params.quoteReplyId;

  return req.db.postReply.create({
    postId: postId,
    userId: user.id,
    postPollOptionId: postPollOptionId,
    comment: comment,
    quoteReplyId: quoteReplyId
  })
  .then(postReply => {
    postReply.newId = postReply.id + '_postReply';
    postReply.credits = 1;
    req.$scope.userCredits = postReply;
    req.$scope.userId = user.id;
    next();
    return postReply;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postReply.create Error - post-post-reply');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
const response = (req, res) => {
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: {
      id: crypto.cipher(req.$scope.userCredits.id)
    }
  };

  res.status(200).send(body);
};

module.exports.querySchema = querySchema;
module.exports.logic = postPostReply;
module.exports.response = response;
