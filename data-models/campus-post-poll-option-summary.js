'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostPollOptionSummary = sequelize.define('campusPostPollOptionSummary', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'campus_post_poll_option_summary',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CampusPostPollOptionSummary;
};