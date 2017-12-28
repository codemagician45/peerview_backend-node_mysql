'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPostReply = sequelize.define('communityPostReply', {
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
    tableName: 'community_post_reply',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPostReply.associate = function (models) {
    this.belongsTo(models.communityPost);
    this.belongsTo(models.user);
    this.belongsTo(models.communityPostPollOption);
  };

  return CommunityPostReply;
};
