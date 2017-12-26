'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusJob = sequelize.define('campusJob', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    location: {
      type: dataTypes.STRING
    },
    hoursPerWeek: {
      type: dataTypes.INTEGER
    },
    pricePerHour: {
      type: dataTypes.DECIMAL
    }
  }, {
    tableName: 'campus_job',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusJob.associate = function (models) {
    this.belongsTo(models.campusJobType);
    this.belongsTo(models.campus);
  };

  return CampusJob;
};
