'use strict';

/**
 * This would be creation of private community
 */

module.exports = function (sequelize, dataTypes) {
  const Community = sequelize.define('community', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    institutionName: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'community',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Community.associate = function (models) {
    this.hasMany(models.communityUsers);
  };

  return Community;
};
