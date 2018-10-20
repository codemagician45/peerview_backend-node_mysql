'use strict';

module.exports = function (sequelize, dataTypes) {
  const Notification = sequelize.define('notification', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    isRead: {
      type: dataTypes.BOOLEAN,
      default: false
    },
    type: {
      type: dataTypes.STRING/*post, etc*/
    },
    message: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'notification',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Notification.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'subjectId',
      as: 'subject'
    });

    this.belongsTo(models.post, {
      foreignKey: 'postId',
      as: 'post'
    });
  };

  return Notification;
};
