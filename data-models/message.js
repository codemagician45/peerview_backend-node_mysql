'use strict';

module.exports = function (sequelize, dataTypes) {
  const Message = sequelize.define('message', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING
    },
    detail: {
      type: dataTypes.STRING
    },
    isRead: {
      type: dataTypes.BOOLEAN,
      default: false
    }
  }, {
    tableName: 'message',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Message.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'fromId',
      as: 'from'
    });
    this.belongsTo(models.user, {
      foreignKey: 'toId',
      as: 'to'
    });
    this.hasMany(models.message, {
      foreignKey: 'parentId',
      as: 'messages'
    });
  };

  return Message;
};
