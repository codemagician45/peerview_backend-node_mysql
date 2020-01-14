'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPostReport = sequelize.define('eventPostReport', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'event_post_report',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPostReport.associate = function (models) {
    this.belongsTo(models.eventPost);
    this.belongsTo(models.user, {
      foreignKey: 'reportedBy'
    });
  };

  return EventPostReport;
};
