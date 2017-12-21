'use strict';

/**
 * This is the adding of users when we create
 * a private community; so basically we are integrating
 * the community created with the list of users in it.
 */

module.exports = function (sequelize, dataTypes) {
  const CommunityUsers = sequelize.define('communityUsers', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    status: {// meaning the user has not yet approved the request
      type: dataTypes.STRING,
      defaultValue: 'pending'
    },
    institutionName: {
      type: dataTypes.STRING
    },
    isCreator: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'community_users',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CommunityUsers;
};
