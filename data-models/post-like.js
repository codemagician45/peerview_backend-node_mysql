'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostLike = sequelize.define('postLike', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'post_like',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostLike.associate = function (models) {
    this.belongsTo(models.post);
    this.belongsTo(models.user);
  };

  return PostLike;
};
