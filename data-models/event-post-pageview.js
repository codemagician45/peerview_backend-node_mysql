'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPostPageview = sequelize.define('eventPostPageview', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'event_post_pageview',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPostPageview.associate = function (models) {
    this.belongsTo(models.eventPost);
    this.belongsTo(models.user);
  };

  return EventPostPageview;
};
