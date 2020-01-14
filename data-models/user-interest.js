'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserInterest = sequelize.define('userInterest', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: 'user_interest',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserInterest.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.interest);
  };

  return UserInterest;
};
