'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserCommunity = sequelize.define('userCommunity', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    isApproved: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'user_community',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserCommunity.associate = function (models) {
    this.belongsTo(models.community);
    this.belongsTo(models.user);
  };

  return UserCommunity;
};
