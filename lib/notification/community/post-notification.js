/*eslint-disable max-nested-callbacks*/
'use strict';

const looPromise = require('../loop-promise');

const postNotification = (req, res, next) => {
  next();
  let user = req.$scope.user;
  let counter = 0;

  return getUserCourseList(req)
  .then((userCourseList) => {
    let userCourse = userCourseList[counter];
    looPromise(() => {
      return counter < userCourseList.length;
    }, () => {
      return new Promise((resolve) => {
        req.db.notification
        .create({
          area: 'community',
          type: 'post',
          subjectId: user.id,
          recipientId: userCourse.userId,
          courseId: userCourse.courseId
        })
        .then(() => {
          resolve(true);
          counter += 1;
        })
        .catch(() => {
          resolve(true);
          counter += 1;
        });
      });
    });
  });
};

const getUserCourseList = (req) => {
  let courseId = req.$params.courseId;

  req.db
  .userCourse
  .findAll({
    where: {
      courseId: {
        [req.Op.eq]: courseId
      }
    }
  })
  .then((userCourseList) => {
    return userCourseList();
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

module.exports.postNotification = postNotification;
