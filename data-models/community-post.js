'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPost = sequelize.define('communityPost', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'community_post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPost.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.userType);
    this.belongsTo(models.course);
    this.hasMany(models.communityPostLike);
    this.hasMany(models.communityPostRating);
    this.hasMany(models.communityPostReply);
  };

  return CommunityPost;
};
