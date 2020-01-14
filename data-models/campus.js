'use strict';

module.exports = function (sequelize, dataTypes) {
  const Campus = sequelize.define('campus', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING,
      unique: true
    },
    password: {
      type: dataTypes.STRING
    },
    enrollment_year: {
      type: dataTypes.DATE
    },
    logo: {
      type: dataTypes.STRING
    },
    status: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'campus',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return Campus;
};
