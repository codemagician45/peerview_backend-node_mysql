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
  let schema = {
    title: {
      notEmpty: {
        errorMessage: 'Missing Resource: Title'
      }
    },
    description: {
      notEmpty: {
        errorMessage: 'Missing Resource: Description'
      }
    },
    email: {
      notEmpty: {
        errorMessage: 'Missing Resource: Email'
      }
    },
    phone: {
      notEmpty: {
        errorMessage: 'Missing Resource: Phone'
      }
    },
    price: {
      notEmpty: {
        errorMessage: 'Missing Resource: Price'
      }
    },
    author: {
      optional: true
    },
    location: {
      optional: true
    },
    edition: {
      optional: true
    },
    cloudinaryPublicIds: {
      optional: true
    },
    campusId: {
      notEmpty: {
        errorMessage: 'Missing Resource: Campus Id'
      }
    }
  };

  req.checkBody(schema);
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
      err: error
    }, 'campusMarketplace.create Error - post-campus-marketplace');
  });
}

function saveCampusMarketplacePhotos (req, res, next) {// eslint-disable-line id-length
  let campus = req.$scope.campus;
  let cloudinaryPublicIds = req.$scope.cloudinaryPublicIds;
  let photos = [];

  cloudinaryPublicIds.forEach(cloudinaryPublicId => {
    photos.push({
      campusId: campus.id,
      cloudinaryPublicId: cloudinaryPublicId
    });
  });
  return req.db.campusMarketplacePhotos.bulkCreate(photos)
  .then(campusMarketplacePhotos => {// eslint-disable-line id-length
    next();
    return campusMarketplacePhotos;
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'campusMarketplacePhotos.bulkCreate Error - post-campus-marketplace');
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
module.exports.saveCampusMarketplacePhotos = saveCampusMarketplacePhotos;
module.exports.response = response;
