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
    },
    title: {
      type: dataTypes.STRING
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Post.associate = function (models) {
    // this.hasMany(models.postComplaint);
    this.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user'
    });
    // directPost
    this.belongsTo(models.user, {
      foreignKey: 'postTo',
      as: 'directPost'
    });
    this.hasMany(models.attachment);
    this.hasMany(models.postPollOption);
    this.hasMany(models.post, {
      foreignKey: 'sharePostId',
      as: 'postShare'
    });
    this.hasMany(models.postLike, {
      as: 'postLike'
    });
    this.hasMany(models.postRating, {
      as: 'postRating'
    });
    this.hasMany(models.postReply, {
      as: 'postReply'
    });
    this.hasMany(models.postPageview, {
      as: 'postPageview'
    });
  };

  return Post;
};
