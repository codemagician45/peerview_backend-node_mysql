'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPostReply = sequelize.define('eventPostReply', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: dataTypes.STRING
    },
    hideComment: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'event_post_reply',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPostReply.associate = function (models) {
    this.belongsTo(models.eventPost);
    this.belongsTo(models.user);
    this.belongsTo(models.eventPostPollOption);
  };

  return EventPostReply;
};
