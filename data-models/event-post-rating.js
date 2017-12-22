'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPostRating = sequelize.define('eventPostRating', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'event_post_rating',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPostRating.associate = function (models) {
    this.belongsTo(models.eventPost);
    this.belongsTo(models.user);
  };

  return EventPostRating;
};
