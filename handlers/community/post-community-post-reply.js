'use strict';

/**
 * @author Jo-Ries Canino
 * @description Community Post Reply
 */

const lib = require('../../lib');
const templates = require('../../templates');

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
    communityPostId: {
      isInt: {
        errorMessage: 'Invalid Resource: Community Post Id'
      }
    }
  };

  let bodySchema = {
    comment: {
      notEmpty: {
        errorMessage: 'Missing Resource: Comment'
      },
      isLength: {
        options: [{
          min: 1,
          max: 280
        }],
        errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
      }
    },
    studyLevelId: {// use for posting user credits
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Study Level Id'
      }
    },
    courseId: {// use for posting user credits
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Community Id'
      }
    },
    averageRating: {// use for posting user credits
      optional: true,
      isFloat: {
        errorMessage: 'Invalid Resource: Average Rating'
      }
    },
    communityPostPollOptionId: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Community Post Poll Option Id'
      }
    }
  };

  req.checkParams(paramsSchema);
  req.checkBody(bodySchema);
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
 * In which if the user is still unverified
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postCommunityPostReply (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let communityPostId = req.$params.communityPostId;
  let communityPostPollOptionId = req.$params.communityPostPollOptionId;// eslint-disable-line id-length
  let comment = req.$params.comment;
  let courseId = req.$params.courseId;
  let userStudyLevelId = req.$params.studyLevelId;
  let averageRating = req.$params.averageRating;

  return req.db.communityPostReply.create({
    communityPostId: communityPostId,
    userId: user.id,
    communityPostPollOptionId: communityPostPollOptionId,
    comment: comment
  })
  .then(communityPostReply => {
    communityPostReply.newId = communityPostReply.id + '_communityPostReply';
    communityPostReply.credits = 2;
    req.$scope.userId = user.id;

    if (courseId && averageRating) {
      communityPostReply.credits = Math.round(averageRating);
      communityPostReply.courseId = courseId;
      communityPostReply.userStudyLevelId = userStudyLevelId;
    }

    req.$scope.userCredits = communityPostReply;
    next();
    return communityPostReply;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postReply.create Error - post-community-post-reply');
  });
}

/**
 * Send an Email
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function sendEmail (req, res, next) {
  let user = req.$scope.user;
  let communityPostId = req.$params.communityPostId;
  let comment = req.$params.comment;
  let file = templates.communityReply;
  let emailTosend;

  if (!comment) {
    return next();
  }

  let values = {
    userWhoCommented: `${user.firstName} ${user.lastName}`,
    postOwner: '',
    comment: comment
  };

  return req.db.communityPost.findOne({
    include: [{
      model: req.db.user
    }],
    where: {
      id: {
        [req.Op.eq]: communityPostId
      }
    }
  })
  .then(communityPost => {
    values.postOwner = communityPost.user.firstName + ' ' + communityPost.user.lastName;
    emailTosend = communityPost.user.email;

    return lib.pug.convert(file, values);
  })
  .then(content => {
    return lib.email.send(`${user.firstName} ${user.lastName} recently commented on your post/question!`,
      emailTosend, content);
  })
  .then(pug => {
    next();
    return pug;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'pug.convert Error - post-user-forgot-password');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCommunityPostReply;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
