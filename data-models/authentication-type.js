'use strict';

module.exports = function (sequelize, dataTypes) {
  const Authenticationtype = sequelize.define('authenticationType', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'authentication_type',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return Authenticationtype;
};
