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

  Post.prototype.getPOSTSHARE = async function (posts, req) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await req.db.post
      .findOne({
        include: [{
          model: req.db.attachment,
          exclude: []
        }, {
          model: req.db.user,
          as: 'user',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'schoolName',
            'profilePicture'
          ]
        }],
        where: {
          id: {
            [req.Op.eq]: post.sharePostId
          }
        }
      });

      post.dataValues.postShare = contents;
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

  Post.prototype.getPOSTPOLLOPTIONS = async function (posts, model) {
    posts = await Promise.all(posts.map(async (post) => {
      const colCount = sequelize.fn('COUNT',
        sequelize.col('postPollOptionSummary.postPollOptionId'));

      const contents = await post
      .getPostPollOptions({
        attributes: {
          include: [
            'id',
            'name',
            [colCount, 'count'],
          ]
        },
        include: [{
          model: model.postPollOptionSummary,
          as: 'postPollOptionSummary',
          attributes: []
        }],
        group: ['postPollOption.id'],
      });

      post.dataValues.postPollOptions = contents;
      return post;
    }));

    return posts;
  };

  Post.prototype.getPOSTLIKES = async function (posts, req) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await post
      .getPostLike({
        include: [{
          model: req.db.user
        }]
      });

      post.dataValues.postLike = contents;
      return post;
    }));

    return posts;
  };

  return Post;
};
