'use strict';

/**
 * @author Jo-Ries Canino
 * @description Register using social credentials
 */

const randomstring = require('randomstring');
const lib = require('../../lib');

function validateParams (req, res, next) {
  let bodySchema = {
    firstName: {
      notEmpty: {
        errorMessage: 'Missing Resource: First Name'
      }
    },
    lastName: {
      notEmpty: {
        errorMessage: 'Missing Resource: Last Name'
      }
    },
    image: {// profile image in social login
      notEmpty: {
        errorMessage: 'Missing Resource: Image'
      }
    },
    email: {
      notEmpty: {
        errorMessage: 'Missing Resource: Email'
      },
      isEmail: {
        errorMessage: 'Invalid Resource: Email'
      }
    },
    uid: {
      notEmpty: {
        errorMessage: 'Missing Resource: UID'
      }
    },
    provider: {
      notEmpty: {
        errorMessage: 'Missing Resource: Provider'
      }
    }
  };

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
 * Find current user
 * type would mean; the type of login via
 * facebook, linkeIn, and google
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function findUser (req, res, next) {
  let provider = req.$params.provider;
  let email = req.$params.email;
  let query = {};

  if (provider === 'facebook') {
    query.facebookId = req.$params.uid;
    req.$scope.social = 'facebookId';
  } else if (provider === 'linkedIN') {
    query.linkedinId = req.$params.uid;
    req.$scope.social = 'linkedinId';
  } else if (provider === 'google') {
    query.googleId = req.$params.uid;
    req.$scope.social = 'googleId';
  }

  query.email = email;
  return req.db.user.findOne({
    where: {
      [req.Op.and]: query
    }
  })
  .then(user => {
    if (user) {
      req.$scope.user = user;
    }

    next();
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findOne Error - post-user-social-login');
  });
}

/**
 * This would be the fallback if the user is existed
 * Then update or create the user
 * @see {@link findUser}
 * @see findUser
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function saveOrUpdateUser (req, res, next) {
  let user = req.$scope.user;
  let firstName = req.$params.firstName;
  let lastName = req.$params.lastName;
  let email = req.$params.email;
  let image = req.$params.image;
  let token = randomstring.generate();

  let create = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    socialImage: image,
    token: token
  };

  /**
   * @description - The value of req.$scope.social
   * @param {facebook_id|linkedin_id|google_id} req.$scope.social string
   */
  create[req.$scope.social] = req.$params.uid;

  if (!user) {
    return req.db.user.create(create)
    .then(user => {
      req.$scope.user = user;
      next();
      return user;
    })
    .catch(error => {
      res.status(500)
      .send(new lib.rpc.InternalError(error));

      req.log.error({
        err: error.message
      }, 'user.create Error - post-user-social-login');
    });
  } else {
    let update = {};
    update[req.$scope.social] = req.$params.socialId;
    req.$scope.user[req.$scope.social] = req.$params.socialId;
    return req.db.user.update(update, {
      where: {
        email: email
      }
    })
    .then(user => {
      next();
      return user;
    })
    .catch(error => {
      res.status(500)
      .send(new lib.rpc.InternalError(error));

      req.log.error({
        err: error.message
      }, 'user.update Error - post-social-login');
    });
  }
}

const getUserProfile = (req, res, next) => {
  const userId = req.$scope.user.id;
  const sequelize = req.db.user.sequelize;
  return req.db.user.findOne({
    include: [{
      model: req.db.userInterest,
      include: [{
        model: req.db.interest
      }]
    }, {
      model: req.db.userType
    }, {
      model: req.db.userCourse,
      include: {
        model: req.db.course
      }
    }, {
      model: req.db.userFollower,
      as: 'followee',
      attributes: []
    }, {
      model: req.db.userCredits,
      attributes: [
        [sequelize.fn('SUM',
          sequelize.col('credits')), 'totalCredits'],
      ],
    }],
    where: {
      id: {
        [req.Op.eq]: userId
      }
    }
  })
  .then(user => {
    req.$scope.user = user;
    next();
    /**
     * This would a return coming from the top then
     * so that we can eliminate this error
     * http://goo.gl/rRqMUw
     */
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));
  });
};

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let user = req.$scope.user;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: user
  };

  res.status(200).send(body);
}

module.exports.validateParams = validateParams;
module.exports.findUser = findUser;
module.exports.saveOrUpdateUser = saveOrUpdateUser;
module.exports.getUserProfile = getUserProfile;
module.exports.response = response;
