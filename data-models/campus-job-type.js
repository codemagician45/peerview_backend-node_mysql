'use strict';

/**
 * This is a job type which includes:
 * contract
 * full-time
 * part-time
 */

module.exports = function (sequelize, dataTypes) {
  const CampusJobType = sequelize.define('campusJobType', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_job_type',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CampusJobType;
};
