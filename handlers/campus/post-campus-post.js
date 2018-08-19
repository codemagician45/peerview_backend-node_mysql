'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Campus
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
    campusId: {
      isInt: {
        errorMessage: 'Invalid Resource: Campus Id'
      }
    },
    courseId: {// use in the course feed
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Course Id'
      }
    },
    campusFreshersFeedId: {// use in the freshers feed
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Freshers Feed Id'
      }
    },
    classId: {
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Course Class Id'
      }
    },
    clubId: {// use in society-club
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Society Club Id'
      }
    },
    groupId: {// use in student group
      optional: true,
      isInt: {
        errorMessage: 'Invalid Resource: Campus Student Group Id'
      }
    }
  };

  let bodySchema = {
    message: {// this will be used as a jsonData for brainstorming
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
      }
    }
  };

  // check if we have params for question; which means we
  // are posting using poll capability
  if (req.$params.campusPostPoll.question) {
    let pollSchema = {
      'campusPostPoll.question': {
        isLength: {
          options: [{
            min: 1
          }],
          errorMessage: 'Missing Resource: Question'
        }
      },
      'campusPostPoll.options': {
        isArrayNotEmpty: {
          errorMessage: 'Missing Resource: Options'
        },
        isArray: {
          errorMessage: 'Invalid Resource: Options'
        }
      },
      'campusPostPoll.duration': {
        isLength: {
          options: [{
            min: 1
          }],
          errorMessage: 'Missing Resource: Duration'
        },
        isInt: {
          errorMessage: 'Invalid Resource: Duration'
        }
      }
    };

    bodySchema = pollSchema;
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

function postCampusPost (req, res, next) {
  let user = req.$scope.user;
  let message = req.$params.message;
  let campusId = req.$params.campusId;
  let courseId = req.$params.courseId;
  let campusFreshersFeedId = req.$params.campusFreshersFeedId;
  let campusCourseClassId = req.$params.classId;
  let campusSocietyClubId = req.$params.clubId;
  let campusStudentGroupId = req.$params.groupId;
  let question = undefined;
  let duration = undefined;

  if (req.$params.campusPostPoll.question) {
    question = req.$params.campusPostPoll.question;
    duration = req.$params.campusPostPoll.duration;
  }

  return req.db.campusPost.create({
    userId: user.id,
    campusId: campusId,
    courseId: courseId,
    campusFreshersFeedId: campusFreshersFeedId,
    campusCourseClassId: campusCourseClassId,
    campusSocietyClubId: campusSocietyClubId,
    campusStudentGroupId: campusStudentGroupId,
    message: message,
    question: question,
    duration: duration
  })
  .then(campusPost => {
    campusPost.dataValues.user = user.dataValues;
    campusPost.dataValues.likeCount = 0;
    campusPost.dataValues.isUserPostLike = 0;
    campusPost.dataValues.postReply = [];
    campusPost.dataValues.postLike = [];
    req.$scope.campusPost = campusPost;
    next();
    return campusPost;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPost.create Error - post-campus-post');
  });
}


function saveAttachments (req, res, next) {
  let campusPost = req.$scope.campusPost;
  let cloudinary = req.$params.attachments
    ? req.$params.attachments : [];
  let attachments = [];

  if (cloudinary.length === 0) {
    return next();
  }

  cloudinary.forEach(item => {
    attachments.push({
      campusPostId: campusPost.id,
      cloudinaryPublicId: item.cloudinaryPublicId,
      usage: item.usage
    });
  });

  return req.db.attachment.bulkCreate(attachments)
  .then(attachments => {
    campusPost.dataValues.attachments = attachments;
    req.$scope.campusPost = campusPost;
    next();
    return attachments;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'attachment.bulkCreate Error - post-campus-post');
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
function saveCampusPostPollOption (req, res, next) {// eslint-disable-line id-length
  // check if we have params for question
  if (!req.$params.campusPostPoll.question) {return next();}

  let campusPost = req.$scope.campusPost;
  let options = req.$params.campusPostPoll.options;
  let campusPostPollOption = [];

  options.forEach(option => {
    campusPostPollOption.push({
      name: option,
      campusPostId: campusPost.id
    });
  });

  return req.db.campusPostPollOption.bulkCreate(campusPostPollOption)
  .then(campusPostPollOptions => {// eslint-disable-line id-length
    campusPostPollOptions = campusPostPollOptions.map(postPoll => {
      postPoll.dataValues.sum = 0;
      postPoll.dataValues.count = 0;
      postPoll.dataValues.average = 0;

      return postPoll;
    });

    campusPost.dataValues.postPollOptions = {};
    campusPost.dataValues.postPollOptions.fulfillmentValue = campusPostPollOptions;
    req.$scope.campusPost = campusPost;
    next();
    return campusPostPollOptions;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusPostPollOption.create Error - post-campus-post');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let campusPost = req.$scope.campusPost;

  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 201,
    data: campusPost
  };

  res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postCampusPost;
module.exports.saveAttachments = saveAttachments;
module.exports.saveCampusPostPollOption = saveCampusPostPollOption;
module.exports.response = response;
