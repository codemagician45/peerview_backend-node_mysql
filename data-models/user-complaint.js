'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserComplaint = sequelize.define('userComplaint', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'user_complaint',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserComplaint.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'userId'
    });
  };

  return UserComplaint;
};
