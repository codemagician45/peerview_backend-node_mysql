'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventGuestList = sequelize.define('eventGuestList', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    isCreator: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'event_guest_list',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventGuestList.associate = function (models) {
    this.belongsTo(models.event);
    this.belongsTo(models.user);
  };

  return EventGuestList;
};
