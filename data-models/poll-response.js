'use strict';

module.exports = function (sequelize, dataTypes) {
  const PollResponse = sequelize.define('pollResponse', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'poll_response',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PollResponse.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.poll);
  };

  return PollResponse;
};
