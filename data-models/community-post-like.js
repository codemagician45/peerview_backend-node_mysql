'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPostLike = sequelize.define('communityPostLike', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'community_post_like',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPostLike.associate = function (models) {
    this.belongsTo(models.communityPost);
    this.belongsTo(models.user);
  };

  return CommunityPostLike;
};
