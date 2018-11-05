'use strict';

module.exports = function (sequelize, dataTypes) {
  const Report = sequelize.define('report', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'report',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Report.associate = function (models) {
    this.belongsTo(models.postv1);
    this.belongsTo(models.user, {
      foreignKey: 'reportedBy'
    });
  };

  return Report;
};
