'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPollOption = sequelize.define('communityPollOption', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'community_poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CommunityPollOption;
};
