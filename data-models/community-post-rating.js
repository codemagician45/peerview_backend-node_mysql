'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPostRating = sequelize.define('communityPostRating', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'community_post_rating',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPostRating.associate = function (models) {
    this.belongsTo(models.communityPost);
    this.belongsTo(models.user);
  };

  return CommunityPostRating;
};
