'use strict';

module.exports = function (sequelize, dataTypes) {
  const Event = sequelize.define('event', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    startDate: {
      type: dataTypes.DATE
    },
    endDate: {
      type: dataTypes.DATE
    },
    salesCloseDate: {
      type: dataTypes.DATE
    },
    ticketSalesEndDate: {
      type: dataTypes.DATE
    },
    venueAddress: {
      type: dataTypes.STRING
    },
    ticketPrice: {
      type: dataTypes.FLOAT
    },
    institutionName: {
      type: dataTypes.STRING
    },
    organizerBankAccount: {
      type: dataTypes.STRING
    },
    organizerContactDetails: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'event',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Event.associate = function (models) {
    this.belongsTo(models.city);
    this.belongsTo(models.eventDressCode);
    this.belongsTo(models.eventType);
    this.hasMany(models.eventGuestList);
    this.hasMany(models.eventAttachment);
  };

  return Event;
};
