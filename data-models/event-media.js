'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventMedia = sequelize.define('eventMedia', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'event_media',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventMedia.associate = function (models) {
    this.belongsTo(models.event);
  };

  return EventMedia;
};
