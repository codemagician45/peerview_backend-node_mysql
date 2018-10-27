'use strict';

module.exports = function (sequelize, dataTypes) {
  const Reply = sequelize.define('reply', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: dataTypes.STRING
    },
    hideComment: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'reply',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Reply.associate = function (models) {
    this.belongsTo(models.postv1);
    this.belongsTo(models.user);
  };

  return Reply;
};
