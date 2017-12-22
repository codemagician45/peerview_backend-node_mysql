'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPostPoll = sequelize.define('eventPostPoll', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {// in seconds
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'event_post_poll',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPostPoll.associate = function (models) {
    this.belongsTo(models.user);
    this.hasMany(models.eventPostPollOption);
  };

  return EventPostPoll;
};
