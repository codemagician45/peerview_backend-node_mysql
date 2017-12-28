'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventVIP = sequelize.define('eventVIP', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    phoneNumberOrEmail: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'event_VIP',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventVIP.associate = function (models) {
    this.belongsTo(models.event);
    this.belongsTo(models.user, {
      foreignKey: 'senderId',
      as: 'sender'
    });
  };

  return EventVIP;
};
