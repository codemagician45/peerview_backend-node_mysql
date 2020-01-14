'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Profile of the current login User
 */

const lib = require('../../lib');

function getUserProfile (req, res, next) {
  /**
   * Basically check if we have req.$params.userId
   * if we are getting timeline of a certain user
   * or getting the timeline of particular userId
   */

  let userId = req.$params.userId || req.$scope.user.id;
  let currentLoginUserId = req.$scope.user.id;
  const sequelize = req.db.userCredits.sequelize;

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
    }, {
      model: req.db.workExperience
    }, {
      model: req.db.award
    }, {
      model: req.db.education
    }, {
      model: req.db.userSkill
    }],
    where: {
      id: {
        [req.Op.eq]: userId
      }
    }
  })
  .then(user => {
    req.$scope.user = user;
    return user.getFollowee({
      where: {
        followerId: currentLoginUserId
      }
    });
  })
  .then((userFollowers) => {
    let user = req.$scope.user;
    if (userFollowers.length !== 0) {
      user.dataValues.isAlreadyFollowed = true;
      req.$scope.user = user;
    }

    next();
    return userFollowers;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-user');
  });
}

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

module.exports.logic = getUserProfile;
module.exports.response = response;
