'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update User Name
 */

const lib = require('../../lib');

function updateGeneralSetting (req, res, next) {

  let bodySchema = {
    firstName: {
      notEmpty: {
        errorMessage: 'Missing Resource: First Name'
      },
    },
    lastName: {
      notEmpty: {
        errorMessage: 'Missing Resource: Last Name'
      }
    },
    language: {
      notEmpty: {
        errorMessage: 'Missing Resource: Language'
      }
    },
    birthDate: {
      notEmpty: {
        errorMessage: 'Missing Resource: Birth Date'
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

    let user = req.$scope.user;
    let firstName = req.$params.firstName;
    let lastName = req.$params.lastName;
    let language = req.$params.language;
    let birthDate = req.$params.birthDate;

    req.db.user.update({
      firstName: firstName,
      lastName: lastName,
      language: language,
      birthDate: birthDate
    }, {
      where: {
        id: {
          [req.Op.eq]: user.id
        }
      }
    })
    .then(user => {
      let body = {
        status: 'SUCCESS',
        status_code: 0,
        http_code: 200,
        data: user
      };
    
      res.status(200).send(body);
    })
    .catch(error => {
      res.status(500)
      .send(new lib.rpc.InternalError(error));
  
      req.log.error({
        err: error.message
      }, 'user.update Error - update-user-name');
    });
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));
  });
}

function updateSocialLinks (req, res, next) {

  let user = req.$scope.user;
  let facebook_profile = req.$params.facebook_profile;
  let twitter_profile = req.$params.twitter_profile;
  let instagram_profile = req.$params.instagram_profile;
  let snapchat_profile = req.$params.snapchat_profile;

  req.db.user.update({
    facebook_profile: facebook_profile,
    twitter_profile: twitter_profile,
    instagram_profile: instagram_profile,
    snapchat_profile: snapchat_profile
  }, {
    where: {
      id: {
        [req.Op.eq]: user.id
      }
    }
  })
  .then(user => {
    let body = {
      status: 'SUCCESS',
      status_code: 0,
      http_code: 200,
      data: user
    };
  
    res.status(200).send(body);
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'user.update Error - update-user-name');
  });
}

module.exports.updateGeneralSetting = updateGeneralSetting;
module.exports.updateSocialLinks = updateSocialLinks;
