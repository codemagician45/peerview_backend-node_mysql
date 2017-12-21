'use strict';

module.exports = function (sequelize, dataTypes) {
  const Country = sequelize.define('country', {
    name: {
      type: dataTypes.STRING,
      primaryKey: true
    }
  }, {
    tableName: 'country',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Country.associate = function (models) {
    this.hasMany(models.city);
  };

  return Country;
};
