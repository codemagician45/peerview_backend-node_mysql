'use strict';

const lib = require('../../lib');

function validateParams (req, res, next) {
  let paramsSchema = {
    postId: {
      isInt: {
        errorMessage: 'Invalid Resource: Post Id'
      }
    }
  };

  req.checkParams(paramsSchema);

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

function removePostRating (req, res, next) {
  let user = req.$scope.user;
  let postId = req.$params.postId;

  return req.db.postRating.destroy({
    where: {
      [req.Op.and]: {
        postId: {
          [req.Op.eq]: postId
        },
        userId: {
          [req.Op.eq]: user.id
        }
      }
    }
  })
  .then(postRating => {
    next();
    return postRating;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'postRating.destroy Error - remove-post-rating');
  });
}

function response (req, res) {
  let body = {
    status: 'SUCCESS',
    status_code: 0,
    http_code: 200
  };
  res.status(200)
  .send(body);
}


module.exports.validateParams = validateParams;
module.exports.logic = removePostRating;
module.exports.response = response;
