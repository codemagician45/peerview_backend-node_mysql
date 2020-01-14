'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPostPollOption = sequelize.define('communityPostPollOption', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'community_post_poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CommunityPostPollOption;
};
