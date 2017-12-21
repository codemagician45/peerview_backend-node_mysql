'use strict';

module.exports = function (sequelize, dataTypes) {
  const City = sequelize.define('city', {
    name: {
      type: dataTypes.STRING,
      primaryKey: true
    }
  }, {
    tableName: 'city',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return City;
};
