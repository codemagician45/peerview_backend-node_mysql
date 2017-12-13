'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserClass = sequelize.define('userClass', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'user_class',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserClass.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.courseClass);
  };

  return UserClass;
};
