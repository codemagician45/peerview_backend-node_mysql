'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserCategory = sequelize.define('userCategory', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'user_category',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserCategory.associate = function (models) {
    this.hasMany(models.user);
  };

  return UserCategory;
};
