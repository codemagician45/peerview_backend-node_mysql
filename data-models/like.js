'use strict';

module.exports = function (sequelize, dataTypes) {
  const Like = sequelize.define('like', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'like',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Like.associate = function (models) {
    this.belongsTo(models.postv1);
    this.belongsTo(models.user);
  };

  return Like;
};
