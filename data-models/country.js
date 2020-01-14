'use strict';

module.exports = function (sequelize, dataTypes) {
  const Country = sequelize.define('country', {
    code: {
      type: dataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: dataTypes.STRING,
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
