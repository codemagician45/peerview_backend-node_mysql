/*eslint-disable max-len*/
'use strict';

/**
 * @author Jo-Ries Canino
 * @description Get User Peerslist
 * This is a friend suggestion with
 * same city; opposite sex and same course
 */

const lib = require('../../lib');

function getUserCourse (req, res, next) {
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
    next();
    return userCourse;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userCourse.findAll Error - get-peerslist');
  });
}

function getPeerslist (req, res, next) {
  let user = req.$scope.user;
  // let userCourse = req.$scope.userCourse;
  // let gender = 'male';
  //
  // if (user.gender && user.gender.toLowerCase() === 'male') {
  //   gender = 'female';
  // }

  // userCourse = userCourse.map(course => course.courseId);
  // return req.db.user.findAll({ // will used when we have many users
  //   include: [{
  //     model: req.db.userCourse,
  //     attributes: [],
  //     where: {
  //       courseId: {
  //         [req.Op.or]: userCourse
  //       }
  //     }
  //   }],
  //   where: {
  //     [req.Op.and]: {
  //       city: user.city,
  //       gender: gender,
  //       id: {
  //         [req.Op.ne]: user.id
  //       }
  //     }
  //   }
  // })

  return req.db.user.findAll({
    include: [{
      model: req.db.userCourse,
      include: {
        model: req.db.course
      }
    }],
    where: {
      [req.Op.and]: {
        id: {
          [req.Op.ne]: user.id
        },
        token: {
          [req.Op.ne]: null // this is possible because token will be given a value in the post-user-verify-email route
        },
        userTypeId: {
          [req.Op.ne]: null // this is possible because token will be given a value in the post-user-verify-email route
        }
      }
    }
  })
  .then((peersList) => {
    return req.db.user.prototype.isUserAlreadyFollowed(peersList, req.db, user.id);
  })
  .then(peersList => {
    req.$scope.peersList = peersList;
    return next();
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.findAll Error - get-peerslist');
  });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response (req, res) {
  let peersList = req.$scope.peersList;
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200,
    data: peersList
  };

  res.status(200).send(body);
}

module.exports.getUserCourse = getUserCourse;
module.exports.logic = getPeerslist;
module.exports.response = response;
