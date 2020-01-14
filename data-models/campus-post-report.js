'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostReport = sequelize.define('campusPostReport', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_post_report',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPostReport.associate = function (models) {
    this.belongsTo(models.campusPost);
    this.belongsTo(models.user, {
      foreignKey: 'reportedBy'
    });
  };

  return CampusPostReport;
};
