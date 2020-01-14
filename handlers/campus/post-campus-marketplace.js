'use strict';

/**
 * @author Jo-Ries Canino
 * @description Post MarketPlace
 */

const lib = require('../../lib');

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
  let paramsSchema = {
    campusId: {
      isInt: {
        errorMessage: 'Invalid Resource: Campus Id'
      }
    }
  };

  let bodySchema = {
    title: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Title'
      }
    },
    description: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Description'
      }
    },
    email: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Email'
      },
      isEmail: {
        errorMessage: 'Invalid Resource: Email'
      }
    },
    phone: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Phone'
      }
    },
    price: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Price'
      },
      isFloat: {
        errorMessage: 'Invalid Resource: Price'
      }
    },
    author: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Author'
      }
    },
    location: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Location'
      }
    },
    edition: {
      isLength: {
        options: [{
          min: 1
        }],
        errorMessage: 'Missing Resource: Edition'
      }
    },
    attachments: {
      optional: true,
      isArrayNotEmpty: {
        errorMessage: 'Missing Resource: Attachments'
      },
      isArray: {
        errorMessage: 'Invalid Resource: Attachments'
      }
    }
  };

  req.checkParams(paramsSchema);
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
function postCampusMarketplace (req, res, next) {// eslint-disable-line id-length
  let user = req.$scope.user;
  let title = req.$params.title;
  let description = req.$params.description;
  let email = req.$params.email;
  let phone = req.$params.phone;
  let campusId = req.$params.campusId;
  let price = req.$params.price;
  let location = req.$params.location;
  let author = req.$params.author;
  let edition = req.$params.edition;

  return req.db.campusMarketplace.create({
    title: title,
    description: description,
    email: email,
    phone: phone,
    price: price,
    location: location,
    author: author,
    edition: edition,
    campusId: campusId,
    userId: user.id
  })
  .then(campusMarketplace => {
    req.$scope.campusMarketplace = campusMarketplace;
    next();
    return campusMarketplace;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'campusMarketplace.create Error - post-campus-marketplace');
  });
}

function saveCampusAttachments (req, res, next) {// eslint-disable-line id-length
  let campusMarketplace = req.$scope.campusMarketplace;
  let cloudinary = req.$params.attachments
    ? req.$params.attachments : [];
  let attachments = [];

  if (cloudinary.length === 0) {
    return next();
  }

  cloudinary.forEach(item => {
    attachments.push({
      campusMarketplaceId: campusMarketplace.id,
      cloudinaryPublicId: item.cloudinaryPublicId,
      usage: item.usage
    });
  });

  return req.db.attachment.bulkCreate(attachments)
  .then(attachments => {// eslint-disable-line id-length
    next();
    return attachments;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error.message
    }, 'attachment.bulkCreate Error - post-campus-marketplace');
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

module.exports.validateParams = validateParams;
module.exports.logic = postCampusMarketplace;
module.exports.saveCampusAttachments = saveCampusAttachments;
module.exports.response = response;
