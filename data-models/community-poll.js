'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommunityPoll = sequelize.define('communityPoll', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {// in seconds
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'community_poll',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPoll.associate = function (models) {
    this.belongsTo(models.user);
    this.hasMany(models.communityPollOption);
  };

  return CommunityPoll;
};
