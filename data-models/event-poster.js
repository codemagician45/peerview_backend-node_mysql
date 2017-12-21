'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPoster = sequelize.define('eventPoster', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING,
    }
  }, {
    tableName: 'event_poster',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return EventPoster;
};
