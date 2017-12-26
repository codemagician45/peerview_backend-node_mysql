'use strict';

/**
 * This are attachments in every user post
 * Basically a separation of the message and
 * its attachment media. It will be used for event
 * and event-post. So that we can differient what is the
 * usage of a certain media; ex.
 * cloudinary = [{
 *    id: cloudinary_public_id_here,
 *    usage: 'image'| 'poster' | 'video'
 * }]
 *
 */

module.exports = function (sequelize, dataTypes) {
  const EventAttachment = sequelize.define('eventAttachment', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    usage: {
      type: new dataTypes.ENUM('image', 'poster', 'video')
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING,
    }
  }, {
    tableName: 'event_attachment',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return EventAttachment;
};
