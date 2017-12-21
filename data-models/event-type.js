'use strict';

/**
 * Basically right now there are two event type
 * Featured Event
 * Standard Event
 */

module.exports = function (sequelize, dataTypes) {
  const EventType = sequelize.define('eventType', {
    code: {
      type: dataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'event_type',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return EventType;
};
