'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPostPageview = sequelize.define('communityPostPageview', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'community_post_pageview',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPostPageview.associate = function (models) {
    this.belongsTo(models.communityPost);
    this.belongsTo(models.user);
  };

  return CommunityPostPageview;
};
