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
    message: {
      type: dataTypes.STRING,
      default: false
    },
    area: {
      type: new dataTypes.ENUM('home', 'campus', 'community')
    },
    type: {
      type: new dataTypes.ENUM('newFollower', 'postLike', 'postReply', 'postShare', 'communityQuestionPost',
        'communityQuestionFollow', 'communityQuestionReply', 'replyLike', 'replyViaFollowPost', 'replyViaReply')
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
    this.belongsTo(models.user, {
      foreignKey: 'recipientId',
      as: 'recipient'
    });
    this.belongsTo(models.postv1, {
      as: 'postv1'
    });
    this.belongsTo(models.post, {
      as: 'post'
    });
    this.belongsTo(models.course, {
      as: 'course'
    });
    this.belongsTo(models.reply, {
      as: 'reply'
    });
    this.belongsTo(models.postReply, {
      as: 'postReply'
    });
  };

  return Notification;
};
