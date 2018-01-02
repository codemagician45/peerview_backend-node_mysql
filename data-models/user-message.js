'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserMessage = sequelize.define('userMessage', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'user_message',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserMessage.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'fromId'
    });
    this.belongsTo(models.user, {
      foreignKey: 'destinationId'
    });
  };

  return UserMessage;
};
