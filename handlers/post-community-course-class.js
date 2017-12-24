'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post Community Course Classes
 */

const lib = require('../lib');

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
  let bodySchema = {
    courseId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Course Id'
      }
    },
    name: {
      notEmpty: {
        errorMessage: 'Missing Resource: Name'
      }
    }
  };

  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  req.checkBody(bodySchema);
  req.checkHeaders(headerSchema);
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

function postCommunityCourseClass (req, res, next) {
  let community = req.$scope.community;
  let name = req.$params.name;
  let courseId = req.$params.courseId;

  return req.db.courseClass.create({
    courseId: courseId,
    universityId: community.id,
    name: name
  })
  .then(courseClass => {
    return req.db.course.findAll({
      include: [{
        model: req.db.courseClass,
      }, {
        model: req.db.community,
        include: [{
          model: req.db.userCommunity
        }]
      }]
    });
  })
  .then(course => {
    next();
    return course;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'courseClass.create Error - post-community-course-class');
  });
}
