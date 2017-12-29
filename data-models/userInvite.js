'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserInvite = sequelize.define('userInvite', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    emailToInvite: {
      type: dataTypes.STRING
    },
    isRead: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'user_invite',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserInvite.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'inviter',
      as: 'userInviter'
    });
  };

  return UserInvite;
};
