'use strict';

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
    email: {
      type: dataTypes.STRING
    },
    password: {
      type: dataTypes.STRING
    },
    token: {
      type: dataTypes.STRING
    },
    changePassword: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'community',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Community.associate = function (models) {
    this.hasMany(models.userCommunity);
  };

  return Community;
};
