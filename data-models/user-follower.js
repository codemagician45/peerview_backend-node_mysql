'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserFollower = sequelize.define('userFollower', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'user_follower',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserFollower.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'followeeId',
      as: 'followee'
    });
    this.belongsTo(models.user, {
      foreignKey: 'followerId',
      as: 'follower'
    });
  };

  return UserFollower;
};
