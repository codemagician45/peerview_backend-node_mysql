'use strict';

module.exports = function (sequelize, dataTypes) {
  const Follow = sequelize.define('follow', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'follow',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Follow.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'followeeId',
      as: 'followee'
    });
    this.belongsTo(models.user, {
      foreignKey: 'followerId',
      as: 'follower'
    });
  };

  return Follow;
};
