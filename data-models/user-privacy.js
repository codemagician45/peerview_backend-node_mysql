'use strict';

/**
 * This would lead be the privacy option of the user
 * in which it depend how your profile is viewed; ex
 * everyone
 * People I Follow
 * My Followers
 */

module.exports = function (sequelize, dataTypes) {
  const UserPrivacy = sequelize.define('userPrivacy', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: dataTypes.STRING,
      unique: true
    },
    name: {
      type: dataTypes.STRING,
    },
    description: {// what is the use of this privacy
      type: dataTypes.STRING
    }
  }, {
    tableName: 'user_privacy',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return UserPrivacy;
};
