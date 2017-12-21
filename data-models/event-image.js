'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventImage = sequelize.define('eventImage', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING,
    }
  }, {
    tableName: 'event_image',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return EventImage;
};
