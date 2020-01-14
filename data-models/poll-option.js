'use strict';

module.exports = function (sequelize, dataTypes) {
  const PollOption = sequelize.define('pollOption', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return PollOption;
};