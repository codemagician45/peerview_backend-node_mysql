'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPostReport = sequelize.define('communityPostReport', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'community_post_report',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPostReport.associate = function (models) {
    this.belongsTo(models.communityPost);
    this.belongsTo(models.user, {
      foreignKey: 'reportedBy'
    });
  };

  return CommunityPostReport;
};
