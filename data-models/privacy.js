'use strict';

/**
 * '1-public, 2-private, 3-secret'
 */

module.exports = function (sequelize, dataTypes) {
  const Privacy = sequelize.define('privacy', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'privacy',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return Privacy;
};
