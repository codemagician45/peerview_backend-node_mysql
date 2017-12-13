'use strict';

module.exports = function (sequelize, dataTypes) {
  const Post = sequelize.define('post', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Post.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.post, {
      foreignkey: 'sharePostId'
    });
    this.belongsTo(models.postCategory);
    this.hasMany(models.postComplaint);
    this.hasMany(models.postLike);
    this.hasMany(models.postRating);
    this.hasMany(models.postReply);
  };

  return Post;
};
