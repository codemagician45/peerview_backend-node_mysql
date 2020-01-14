'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update Community Post
 * In includes brainstorming map and soon...
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
  let isCareerUrl = req.route.path.indexOf('community/post/:communityPostId/career');
  let isPostPollUrl = req.route.path.indexOf('community/post/:communityPostId/poll');
  let paramsCommunityPost = req.route.path.indexOf(':communityPostId');
  let bodySchema = {};
  let paramsSchema = {};

  if (paramsCommunityPost !== -1) {
    paramsSchema = {
      communityPostId: {
        isInt: {
          errorMessage: 'Invalid Resource: Community Post Id'
        }
      },
    };
  }

  if (isCareerUrl !== -1) {
    bodySchema = {
      title: {
        notEmpty: {
          errorMessage: 'Missing Resource: Title'
        }
      },
      description: {
        notEmpty: {
          errorMessage: 'Missing Resource: Description'
        }
      }
    };
  } else if (isPostPollUrl !== -1) {
    bodySchema = {
      question: {
        notEmpty: {
          errorMessage: 'Missing Resource: Question'
        }
      },
      options: {
        isArrayNotEmpty: {
          errorMessage: 'Missing Resource: Options'
        },
        isArray: {
          errorMessage: 'Invalid Resource: Options'
        }
      },
      duration: {
        notEmpty: {
          errorMessage: 'Missing Resource: Duration'
        },
        isInt: {
          errorMessage: 'Invalid Resource: Duration'
        }
      }
    };
  } else {
    bodySchema = {
      courseId: {// optional because the professionals can post/and courses related post
        optional: true,
        isInt: {
          errorMessage: 'Invalid Resource: Course Id'
        }
      },
      message: {
        notEmpty: {
          errorMessage: 'Missing Resource: Message'
        }
      }
    };
  }

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
function updateCommunityPost (req, res, next) {
  let user = req.$scope.user;
  let courseId = req.$params.courseId;
  let message = req.$params.message;
  let title = req.$params.title;
  let description = req.$params.description;
  let question  = req.$params.question;
  let duration = req.$params.duration;
  let communityPostId = req.$params.communityPostId;

  return req.db.communityPost.update({
    userId: user.id,
    userTypeId: user.userTypeId,
    courseId: courseId,
    message: message,
    title: title,
    description: description,
    question: question,
    duration: duration
  }, {
    where: {
      id: {
        [req.Op.eq]: communityPostId
      }
    }
  })
  .then(communityPost => {
    next();
    return communityPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPost.update Error - update-community-post');
  });
}

function removeCommunityPostPollOption (req, res, next) {// eslint-disable-line id-length
  let communityPostId = req.$params.communityPostId;

  return req.db.communityPostPollOption.destroy({
    where: {
      communityPostId: {
        [req.Op.eq]: communityPostId
      }
    }
  })
  .then(communityPostPollOption => {// eslint-disable-line id-length
    next();
    return communityPostPollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPostPollOption.destroy Error - update-community-post');
  });
}

/**
 * Save the options in the pollOption table
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function saveCommunityPostPollOption (req, res, next) {// eslint-disable-line id-length
  let communityPostId = req.$params.communityPostId;
  let options = req.$params.options;
  let question = req.$params.question;
  let communityPostPollOption = [];// eslint-disable-line id-length

  // check if we have params for question
  if (!question) {return next();}

  options.forEach(option => {
    communityPostPollOption.push({
      name: option,
      communityPostId: communityPostId
    });
  });

  return req.db.communityPostPollOption.bulkCreate(communityPostPollOption)
  .then(communityPostPollOption => {// eslint-disable-line id-length
    next();
    return communityPostPollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'communityPostPollOption.bulkCreate Error - update-community-post');
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
    http_code: 200
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = updateCommunityPost;
module.exports.removeCommunityPostPollOption = removeCommunityPostPollOption;
module.exports.saveCommunityPostPollOption = saveCommunityPostPollOption;
module.exports.response = response;
