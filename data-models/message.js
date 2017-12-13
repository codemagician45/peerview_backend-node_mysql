'use strict';

module.exports = function (sequelize, dataTypes) {
  const Message = sequelize.define('message', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING
    },
    detail: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'message',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Message.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'fromId',
      constraints: false,
      as: 'from'
    });
    this.belongsTo(models.user, {
      foreignKey: 'toId',
      constraints: false,
      as: 'to'
    });
  };

  return Message;
};
