'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Post
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
  let isPostPollUrl = req.route.path.indexOf('post/poll');
  let isPostStory = req.route.path.indexOf('post/story');
  let bodySchema = {};

  if (isPostPollUrl !== -1) {
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
  } else if (isPostStory !== -1) {
    bodySchema = {
      title: {
        notEmpty: {
          errorMessage: 'Missing Resource: Title'
        }
      },
      message: {
        notEmpty: {
          errorMessage: 'Missing Resource: Message'
        },
        isLength: {
          options: [{
            min: 1,
            max: 280
          }],
          errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
        }
      }
    };
  } else {
    bodySchema = {
      message: {
        notEmpty: {
          errorMessage: 'Missing Resource: Message'
        },
        isLength: {
          options: [{
            min: 1,
            max: 280
          }],
          errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
        }
      },
      postTo: {
        optional: true,
        isInt: {
          errorMessage: 'Invalid Resource: postTo'
        }
      },
      attachments: {
        optional: true,
        isArray: {
          errorMessage: 'Invalid Resource: Attachments'
        }
      }
    };
  }

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
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postPost (req, res, next) {
  let user = req.$scope.user;
  let message = req.$params.message;
  let title = req.$params.title;
  let question = req.$params.question;
  let duration = req.$params.duration;
  let postTo = req.$params.postTo;

  return req.db.post.create({
    userId: user.id,
    message: message,
    title: title,
    question: question,
    duration: duration,
    postTo: postTo
  })
  .then(post => {
    req.$scope.post = post;
    // below are used for user credits
    post.newId = post.id + '_post';
    post.credits = 1;
    req.$scope.userCredits = post;
    req.$scope.userId = user.id;
    next();
    return post;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'post.create Error - post-post');
  });
}

function saveAttachments (req, res, next) {
  let post = req.$scope.post;
  let cloudinary = req.$params.attachments
    ? req.$params.attachments : [];
  let attachments = [];

  if (cloudinary.length === 0) {
    return next();
  }

  cloudinary.forEach(item => {
    attachments.push({
      postId: post.id,
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
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'attachment.bulkCreate Error - post-event-post');
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
function savePostPollOption (req, res, next) {// eslint-disable-line id-length
  let post = req.$scope.post;
  let options = req.$params.options;
  let question = req.$params.question;
  let postPollOption = [];// eslint-disable-line id-length

  // check if we have params for question
  if (!question) {return next();}

  options.forEach(option => {
    postPollOption.push({
      name: option,
      postId: post.id
    });
  });

  return req.db.postPollOption.bulkCreate(postPollOption)
  .then(postPollOption => {// eslint-disable-line id-length
    next();
    return postPollOption;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postPollOption.bulkCreate Error - post-post');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let post = req.$scope.post;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    postId: post.id
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postPost;
module.exports.saveAttachments = saveAttachments;
module.exports.savePostPollOption = savePostPollOption;
module.exports.response = response;
