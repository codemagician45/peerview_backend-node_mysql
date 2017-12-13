'use strict';

module.exports = function (sequelize, dataTypes) {
  const Institution = sequelize.define('institution', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'institution',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: [],
    instanceMethods: {}
  });

  Institution.associate = function (models) {
    this.hasMany(models.group);
    this.hasMany(models.event);
  };

  return Institution;
};
