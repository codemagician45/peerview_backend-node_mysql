'use strict';

module.exports = function (sequelize, dataTypes) {
  const Campus = sequelize.define('campus', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'campus',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return Campus;
};
