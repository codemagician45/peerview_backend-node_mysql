'use strict';

module.exports = function (sequelize, dataTypes) {
  const Sex = sequelize.define('sex', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'sex',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return Sex;
};
