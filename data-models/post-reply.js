'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostReply = sequelize.define('postReply', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: dataTypes.STRING
    },
    hideComment: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'post_reply',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostReply.associate = function (models) {
    this.belongsTo(models.post);
    this.belongsTo(models.user);
    this.belongsTo(models.postPollOption);
  };

  return PostReply;
};
