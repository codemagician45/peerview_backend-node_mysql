'use strict';

module.exports = function (sequelize, dataTypes) {
  const FollowThread = sequelize.define('followThread', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'follow_thread',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  FollowThread.associate = function (models) {
    this.belongsTo(models.post);
    this.belongsTo(models.user);
  };

  return FollowThread;
};
