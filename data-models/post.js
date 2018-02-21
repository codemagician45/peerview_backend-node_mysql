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

  Post.prototype.getPOSTREPLY = async function (posts, model) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await post
      .getPostReply({
        limit: 5,
        attributes: ['comment', 'createdAt'],
        include: [{
          model: model.user,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }],
        order: [['createdAt', 'DESC']]
      });

      post.dataValues.postReply = contents;
      return post;
    }));

    return posts;
  };

  Post.prototype.getATTACHMENTS = async function (posts) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await post
      .getAttachments({
        attributes: ['id', 'usage', 'cloudinaryPublicId']
      });

      post.dataValues.attachments = contents;
      return post;
    }));

    return posts;
  };

  return Post;
};
