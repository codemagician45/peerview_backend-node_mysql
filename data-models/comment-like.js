'use strict';

module.exports = function (sequelize, dataTypes) {
  const CommentLike = sequelize.define('commentLike', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'comment_like',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommentLike.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.comment);
  };

  return CommentLike;
};
