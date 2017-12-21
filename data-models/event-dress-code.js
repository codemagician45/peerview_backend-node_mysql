'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventDressCode = sequelize.define('eventDressCode', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'event_dress_code',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return EventDressCode;
};
