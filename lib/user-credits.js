'use strict';

const rpc = require('./rpc');

function updateUserCreditsUponRating (req, res, next) {// eslint-disable-line id-length
  let post = req.$scope.post;
  let userId = post.userId;

  return req.db.userCredits.destroy({
    where: {
      identifier: {
        [req.Op.eq]: post.newId
      }
    }
  })
  .then(() => {
    let roundedRating = Math.round(post.getDataValue('roundedRating'));

    return req.db.userCredits.create({
      userId: userId,
      identifier: post.newId,
      credits: roundedRating,
      courseId: post.courseId
    });
  })
  .then(userCredits => {
    next();
    return userCredits;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userCredits.findOne Error - user-credits');
  });
}

function updateUserCredits (req, res, next) {
  let user = req.$scope.user;
  let userCredits = req.$scope.userCredits;

  return req.db.userCredits.create({
    userId: user.id,
    identifier: userCredits.newId,
    credits: userCredits.credits
  })
  .then(userCredits => {
    next();
    return userCredits;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'userCredits.create Error - user-credits');
  });
}


module.exports.updateUserCredits = updateUserCredits;
module.exports.updateUserCreditsUponRating = updateUserCreditsUponRating;
