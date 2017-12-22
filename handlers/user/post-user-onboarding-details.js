'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post User Type Details
 * Basically for the onboarding phase
 */

const lib = require('../../lib');

function checkUserType (req, res, next) {
  if (req.$params.userTypeId) {
    // check if the userTypeId data code='student'
    return req.db.userType.findOne({
      where: {
        id: req.$params.userTypeId
      }
    })
    .then(userType => {
      req.$scope.userType = userType;
      next();
      return userType;
    })
    .catch(error => {
      res.status(500)
      .send(new lib.rpc.InternalError(error));

      req.log.error({
        err: error
      }, 'userType.findOne Error - post-user-onboarding-details');
    });
  } else {
    return res.status(400).send({
      status: 'ERROR',
      status_code: 101,
      status_message: 'Missing Resource: userTypeId',
      http_code: 400
    });
  }
}

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
  let userType = req.$scope.userType;
  let headerSchema = {
    token: {
      notEmpty: {
        errorMessage: 'Missing Resource: Token'
      }
    }
  };

  let bodySchema = {
    courseIds: {// same with the professionals so that we have one logic for saving the course of the student
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Course Ids'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Course Ids'
      }
    },
    userStudyLevelId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Study level Id'
      }
    },
    userTypeId: {
      notEmpty: {
        errorMessage: 'Missing Resource: User Type Id'
      }
    },
    schoolName: {
      notEmpty: {
        errorMessage: 'Missing Resource: School Name'
      }
    },
    city: {
      notEmpty: {
        errorMessage: 'Missing Resource: Current City'
      }
    },
    gender: {
      notEmpty: {
        errorMessage: 'Missing Resource: Gender'
      }
    }
  };

  if (userType.code === 'professionals') {
    bodySchema = {
      courseIds: {
        isArrayNotEmpty: {
          errorMessage: 'Missing Resource: Course Ids'
        },
        isArray: {
          errorMessage: 'Invalid Resource: Course Ids'
        }
      },
      userTypeId: {
        notEmpty: {
          errorMessage: 'Missing Resource: User Type Id'
        }
      },
      city: {
        notEmpty: {
          errorMessage: 'Missing Resource: Current City'
        }
      },
      role: {
        notEmpty: {
          errorMessage: 'Missing Resource: Role'
        }
      },
      company: {
        notEmpty: {
          errorMessage: 'Missing Resource: Company'
        }
      },
      birthDate: {
        notEmpty: {
          errorMessage: 'Missing Resource: Birth Date'
        }
      }
    };
  } else if (userType.code === 'organizationInstitution') {
    bodySchema = {
      institutionName: {
        notEmpty: {
          errorMessage: 'Missing Resource: Institution Name'
        }
      },
      userTypeId: {
        notEmpty: {
          errorMessage: 'Missing Resource: User Type Id'
        }
      },
      city: {
        notEmpty: {
          errorMessage: 'Missing Resource: Current City'
        }
      },
      yearOfIncorporation: {
        notEmpty: {
          errorMessage: 'Missing Resource: Year Of Incorporation'
        }
      },
      website: {
        notEmpty: {
          errorMessage: 'Missing Resource: Website'
        }
      }
    };
  }

  req.checkHeaders(headerSchema);
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
 * This would be the fallback if the user
 * has a valid token
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postUserOnboardingDetails (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let courseIds = req.$params.courseIds;
  let userStudyLevelId = req.$params.userStudyLevelId;
  let userTypeId = req.$params.userTypeId;
  let schoolName = req.$params.schoolName;
  let city = req.$params.currentCity;
  let gender = req.$params.gender;
  let role = req.$params.role;
  let birthDate = req.$params.birthDate;
  let company = req.$params.company;
  let institutionName = req.$params.institutionName;
  let yearOfIncorporation = req.$params.yearOfIncorporation;
  let website = req.$params.website;

  return req.db.user.update({
    userStudyLevelId: userStudyLevelId,
    userTypeId: userTypeId,
    schoolName: schoolName,
    city: city,
    gender: gender,
    role: role,
    birthDate: birthDate,
    company: company,
    institutionName: institutionName,
    yearOfIncorporation: yearOfIncorporation,
    website: website
  }, {
    where: {
      id: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(user => {
    courseIds = !courseIds ? []/* this is the value when the userType is institution */
      : JSON.parse(courseIds);
    let courses = [];
    courseIds.forEach(courseId => {
      courses.push({
        userId: user.id,
        courseId: courseId
      });
    });

    if (courses.length === 0) {return;}

    return req.db.userCourse.bulkCreate(courses);
  })
  .then(userCourse => {
    next();
    return userCourse;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.update Error - post-user-onboarding-details');
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

module.exports.checkUserType = checkUserType;
module.exports.validateParams = validateParams;
module.exports.logic = postUserOnboardingDetails;
module.exports.response = response;
