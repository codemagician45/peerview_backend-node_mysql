'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventDressCode = sequelize.define('eventDressCode', {
    name: {
      type: dataTypes.STRING,
      primaryKey: true,
    }
  }, {
    tableName: 'event_dress_code',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return EventDressCode;
};
