'use strict';

module.exports = function (sequelize, dataTypes) {
  const Country = sequelize.define('country', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
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
