'use strict';

module.exports = function (sequelize, dataTypes) {
  const Inbox = sequelize.define('inbox', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: dataTypes.STRING
    },
    senderName: {
      type: dataTypes.STRING
    },
    isSeen: {
      type: dataTypes.BOOLEAN
    },
    relationId: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'inbox',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: [],
    instanceMethods: {}
  });

  Inbox.associate = function (models) {
    this.belongsTo(models.user);
  };

  return Inbox;
};
