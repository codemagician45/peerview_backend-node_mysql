'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPostPollOption = sequelize.define('eventPostPollOption', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'event_post_poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPostPollOption.associate = function (models) {
    this.belongsTo(models.eventPostPoll);
  };

  return EventPostPollOption;
};
