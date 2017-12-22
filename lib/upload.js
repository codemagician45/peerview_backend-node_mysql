'use strict';

/**
 * This act as a middleware to for uploads(image)
 * @author Jo-Ries Canino
 */

const multer = require('multer');
const uuid = require('uuid');
const config = require('../config');
const cloudinary = require('cloudinary');
cloudinary.config(config.cloudinary);
const EVENT_FIELDS = [{
  name: 'images',
}, {
  name: 'posters',
}, {
  name: 'videos'
}];

let storage = multer.diskStorage({
  filename: (req, file, callback) => {
    let originalname = file.originalname;
    originalname = originalname.split('.');
    let newName = `${originalname[0]}-${uuid.v4()}.${originalname[1]}`;
    let mimeType = {};

    if (file.mimetype.indexOf('video') !== -1) {
      mimeType = {resource_type: 'video'};
    }

    let stream = cloudinary.v2.uploader
    .upload_stream(mimeType, (error, result) => {
      if (error) {
        return callback(error, newName);
      }

      // check if we have value for req.$scope.cloudinaryPublicId
      if (!req.$scope.cloudinaryPublicIds) {
        req.$scope.cloudinaryPublicIds = [];
        req.$scope.cloudinaryPublicIds.push({
          id: result.public_id
        });
      } else if (req.$scope.cloudinaryPublicIds) {
        req.$scope.cloudinaryPublicIds.push({
          id: result.public_id
        });
      }
      callback(null, newName);
    });

    file.stream.pipe(stream);
  }
});

let events = multer.diskStorage({
  filename: (req, file, callback) => {
    let originalname = file.originalname;
    originalname = originalname.split('.');
    let newName = `${originalname[0]}-${uuid.v4()}.${originalname[1]}`;
    let mimeType = {};
    let type = file.fieldname;

    if (file.mimetype.indexOf('video') !== -1) {
      mimeType = {resource_type: 'video'};
    }

    let stream = cloudinary.v2.uploader
    .upload_stream(mimeType, (error, result) => {
      if (error) {
        return callback(error, newName);
      }

      // check if we have value for req.$scope.cloudinaryPublicId
      if (!req.$scope.cloudinaryPublicIds) {
        req.$scope.cloudinaryPublicIds = [];
        req.$scope.cloudinaryPublicIds.push({
          id: result.public_id,
          type: type
        });
      } else if (req.$scope.cloudinaryPublicIds) {
        req.$scope.cloudinaryPublicIds.push({
          id: result.public_id,
          type: type
        });
      }
      callback(null, newName);
    });

    file.stream.pipe(stream);
  }
});

module.exports.single = multer({storage: storage}).single('file');
module.exports.multiple = multer({storage: storage}).array('file');
module.exports.attachments = multer({storage: storage}).array('attachments');
// use for events
module.exports.events = multer({storage: events}).fields(EVENT_FIELDS);
