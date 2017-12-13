'use strict';

module.exports = function (sequelize, dataTypes) {
  const Notification = sequelize.define('notification', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    notification: {
      type: dataTypes.STRING
    },
    isRead: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'notification',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Notification.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'senderId'
    });
    this.belongsTo(models.user, {
      foreignKey: 'receiverId'
    });
  };

  return Notification;
};
