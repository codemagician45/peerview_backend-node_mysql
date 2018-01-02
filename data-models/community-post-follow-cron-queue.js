'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPostFollowCronQueue = sequelize.define('communityPostFollowCronQueue', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'community_post_follow_cron_queue',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPostFollowCronQueue.associate = function (models) {
    this.belongsTo(models.communityPost);
  };

  return CommunityPostFollowCronQueue;
};
