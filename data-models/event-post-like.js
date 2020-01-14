'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPostLike = sequelize.define('eventPostLike', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'event_post_like',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPostLike.associate = function (models) {
    this.belongsTo(models.eventPost);
    this.belongsTo(models.user);
  };

  return EventPostLike;
};
