'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostPollOptionSummary = sequelize.define('postPollOptionSummary', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'post_poll_option_summary',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return PostPollOptionSummary;
};