'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostReplyLike = sequelize.define('postReplyLike', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'post_reply_like',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostReplyLike.associate = function (models) {
    this.belongsTo(models.postReply);
    this.belongsTo(models.user);
  };

  return PostReplyLike;
};
