'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostReport = sequelize.define('postReport', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'post_report',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostReport.associate = function (models) {
    this.belongsTo(models.post);
    this.belongsTo(models.user, {
      foreignKey: 'reportedBy'
    });
  };

  return PostReport;
};
