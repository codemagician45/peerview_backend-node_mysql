'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventVideo = sequelize.define('eventVideo', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING,
    }
  }, {
    tableName: 'event_video',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return EventVideo;
};
