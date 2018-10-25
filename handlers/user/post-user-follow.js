'use strict';

/**
 * @author Jo-Ries Canino
 * @description User follow
 * Basically you are following another user
 */

const lib = require('../../lib');
const templates = require('../../templates');


/**
 * Initialized the schema Object
 */
const querySchema = {
  userId: { in: ['params'],
    isInt: {
      errorMessage: 'Invalid Resource: User Id'
    },
    toInt: true
  },
  recipientId: { in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'Missing Resource: Recipient Id'
    },
    isInt: {
      errorMessage: 'Invalid Resource: Recipient Id'
    }
  }
};

function postUserFollow (req, res, next) {
  let user = req.$scope.user;
  let followeeId = req.params.userId;

  return req.db.userFollower.create({
    followeeId: followeeId,
    followerId: user.id // I am the follower
  })
  .then(userFollower => {
    // use below for credits
    userFollower.newId = userFollower.id + '_userFollower';
    userFollower.credits = 5;
    req.$scope.userCredits = userFollower;
    req.$scope.userId = followeeId;
    next();
    return userFollower;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userFollower.create Error - post-user-follow');
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
async function sendEmail (req, res, next) {
  let user = req.$scope.user;
  let follower = `${user.firstName} ${user.lastName}`;
  let file = templates.follow;

  return getListOfFriendSuggestion(req)
  .then(friendList => {
    req.$scope.friendList = friendList;

    return req.db.user.findOne({
      where: {
        id: {
          [req.Op.eq]: req.params.userId
        }
      }
    });
  })
  .then(userToFollow => {
    req.$scope.userToFollow = userToFollow;
    let friendList = req.$scope.friendList;
    let followee = `${userToFollow.firstName} ${userToFollow.lastName}`;

    let values = {
      friendList: friendList,
      follower: follower,
      followee: followee
    };

    return lib.pug.convert(file, values);
  })
  .then(content => {
    let userToFollow = req.$scope.userToFollow;
    lib.email.send(`You have a special Invitation`, userToFollow.email, content);
    return content;
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
    }, 'pug.convert Error - post-user-follow');
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

function getListOfFriendSuggestion (req) {// eslint-disable-line id-length
  return getUserCourse(req)
  .then(() => {
    return getPeerslist(req);
  })
  .then(peersList => {
    return peersList;
  });
}

function getUserCourse (req) {
  let user = req.$scope.user;

  return req.db.userCourse.findAll({
    attributes: ['courseId'],
    where: {
      userId: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(userCourse => {
    req.$scope.userCourse = userCourse;
    return userCourse;
  });
}

function getPeerslist (req) {
  let user = req.$scope.user;
  let userCourse = req.$scope.userCourse;
  let gender = 'male';

  if (user.gender && user.gender.toLowerCase() === 'male') {
    gender = 'female';
  }

  userCourse = userCourse.map(course => course.courseId);
  return req.db.user.findAll({
    include: [{
      model: req.db.userCourse,
      attributes: [],
      where: {
        courseId: {
          [req.Op.or]: userCourse
        }
      }
    }],
    where: {
      [req.Op.and]: {
        id: {
          [req.Op.ne]: user.id
        },
        city: user.city,
        gender: gender
      }
    },
    order: [[req.sequelize.fn('RAND')]],
    limit: 5
  })
  .then(peersList => {
    req.$scope.peersList = peersList;
    return peersList;
  });
}

module.exports.querySchema = querySchema;
module.exports.logic = postUserFollow;
module.exports.sendEmail = sendEmail;
module.exports.response = response;
