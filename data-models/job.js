'use strict';

module.exports = function (sequelize, dataTypes) {
  const Job = sequelize.define('job', {
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
    tableName: 'job',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Job.associate = function (models) {
    this.belongsTo(models.jobType);
    this.belongsTo(models.campus);
  };

  return Job;
};
