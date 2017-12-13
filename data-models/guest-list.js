'use strict';

module.exports = function (sequelize, dataTypes) {
  const GuestList = sequelize.define('guestList', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    location: {
      type: dataTypes.STRING
    },
    guestType: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'guest_list',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  GuestList.associate = function (models) {
    this.belongsTo(models.event);
    this.belongsTo(models.user);
  };

  return GuestList;
};
