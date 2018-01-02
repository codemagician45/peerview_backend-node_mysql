'use strict';

/**
 * A user following a Post
 */

module.exports = function (sequelize, dataTypes) {
  const CommunityPostFollow = sequelize.define('communityPostFollow', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'community_post_follow',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPostFollow.associate = function (models) {
    this.belongsTo(models.communityPost);
    this.belongsTo(models.user);
  };

  return CommunityPostFollow;
};
