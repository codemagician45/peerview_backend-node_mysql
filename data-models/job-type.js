'use strict';

/**
 * This is a job type which includes:
 * contract
 * full-time
 * part-time
 */

module.exports = function (sequelize, dataTypes) {
  const JobType = sequelize.define('jobType', {
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
    tableName: 'job_type',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return JobType;
};
