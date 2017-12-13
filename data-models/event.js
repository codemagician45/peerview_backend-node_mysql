'use strict';

module.exports = function (sequelize, dataTypes) {
  const Event = sequelize.define('event', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    address: {
      type: dataTypes.STRING
    },
    price: {
      type: dataTypes.DECIMAL
    },
    startTime: {
      type: dataTypes.DATE
    },
    endTime: {
      type: dataTypes.DATE
    },
    salesCloseTime: {
      type: dataTypes.DATE
    }
  }, {
    tableName: 'event',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Event.associate = function (models) {
    this.belongsTo(models.institution);
    this.belongsTo(models.city);
    this.hasMany(models.eventMedia);
    this.hasMany(models.guestList);
    this.hasMany(models.bookEvent);
  };

  return Event;
};
