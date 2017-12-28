'use strict';

const rpc = require('./rpc');

function updateUserCreditsUponRating (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let post = req.$scope.post;

  return req.db.userCredits.findOne({
    where: {
      postId: post.newId
    }
  })
  .then(userCredits => {
    let roundedRating = Math.round(post.getDataValue('roundedRating'));
    let userCreditsRoundedRating = userCredits // eslint-disable-line id-length
      && userCredits.rating
      && (Math.round(userCredits.rating));

    if (userCredits && userCredits.rating && roundedRating < userCreditsRoundedRating) {
      // update here subtract;
      let difference = userCreditsRoundedRating - roundedRating;
      return req.db.userCredits.update({
        rating: post.getDataValue('roundedRating'),
        credits: userCredits.credits - difference
      }, {
        where: {
          postId: {
            [req.Op.eq]: post.newId
          }
        }
      });
    } else if (userCredits
      && userCredits.rating
      && roundedRating > userCreditsRoundedRating) {
      // update here add;
      let difference = roundedRating - userCreditsRoundedRating;
      return req.db.userCredits.update({
        rating: post.getDataValue('roundedRating'),
        credits: userCredits.credits + difference
      }, {
        where: {
          postId: {
            [req.Op.eq]: post.newId
          }
        }
      });
    } else if (!userCredits) {
      // no user credits has been save for this post
      return req.db.userCredits.create({
        userId: user.id,
        postId: post.newId,
        rating: post.getDataValue('roundedRating'),
        credits: roundedRating
      });
    }
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
  let post = req.$scope.post;

  return req.db.userCredits.create({
    userId: user.id,
    postId: post.newId,
    credits: post.credits
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
