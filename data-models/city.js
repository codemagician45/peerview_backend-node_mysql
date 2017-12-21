'use strict';

module.exports = function (sequelize, dataTypes) {
  const City = sequelize.define('city', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
    }
  }, {
    tableName: 'city',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return City;
};
