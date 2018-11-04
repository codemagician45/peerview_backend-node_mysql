'use strict';

const validator = require('validator');

module.exports = function (sequelize, dataTypes) {
  const PostV1 = sequelize.define('postv1', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {// we use this in the brainstorming that is why we saved the data in json format
      type: dataTypes.TEXT,
      allowNull: true,
      get: function () {
        var rawValue = this.getDataValue('message');
        if (!rawValue) {
          return (undefined);
        } else if (validator.isJSON(rawValue)){
          return JSON.parse(rawValue);
        } else {
          return rawValue;
        }
      },
      set: function (val) {
        var json = (typeof val === 'string') ? val : JSON.stringify(val);
        this.setDataValue('message', json);
      }
    },
    title: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {
      type: dataTypes.INTEGER
    },
    expiration: {
      type: dataTypes.DATE
    },
    area: {
      type: new dataTypes.ENUM('home', 'campus', 'community')
    },
    type: {
      type: new dataTypes.ENUM('post', 'poll', 'career')
    }
  }, {
    tableName: 'postv1',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostV1.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.course);
    this.belongsTo(models.community); // if this field has been filed the post belongsTo private community
    this.hasMany(models.pollOption);
    this.hasMany(models.attachment);
    this.hasMany(models.like, {
      as: 'like'
    });
    this.hasMany(models.rating, {
      as: 'rating'
    });
    this.hasMany(models.reply, {
      as: 'reply'
    });
    this.hasMany(models.pageview, {
      as: 'pageview'
    });
    this.hasMany(models.postv1, {
      foreignKey: 'sharePostId',
      as: 'share'
    });
    this.belongsTo(models.postv1, {
      foreignKey: 'sharePostId',
      as: 'originalPost'
    });
    this.belongsTo(models.user, {
      foreignKey: 'postTo',
      as: 'directPost'
    });

    this.belongsToMany(models.user, {through: models.followPost});
  };

  PostV1.prototype.getReplyCount = async function (posts, db) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await db.reply.count({
        where: {
          postv1Id: post.id
        }
      });
      post.dataValues.replyCount = contents;
      return post;
    }));

    return posts;
  };

  PostV1.prototype.getLikeCount = async function (posts, db) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await db.like.count({
        where: {
          postv1Id: post.id
        }
      });
      post.dataValues.likeCount = contents;
      return post;
    }));

    return posts;
  };

  PostV1.prototype.getPageViewCount = async function (posts, db) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await db.pageview.count({
        where: {
          postv1Id: post.id
        }
      });
      post.dataValues.pageviewCount = contents;
      return post;
    }));

    return posts;
  };

  PostV1.prototype.getShareCount = async function (posts, db) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await db.postv1.count({
        where: {
          sharePostId: post.id
        }
      });
      post.dataValues.shareCount = contents;
      return post;
    }));

    return posts;
  };

  PostV1.prototype.isUserPostLike = async function (posts, db, userId) {
    posts = await Promise.all(posts.map(async (post) => {
      let isUserPostLike = false;
      const contents = await db.like.count({
        where: {
          userId: userId,
          postv1Id: post.id
        }
      });

      if (contents > 0) {
        isUserPostLike = true;
      }
      post.dataValues.isUserPostLike = isUserPostLike;
      return post;
    }));

    return posts;
  };

  PostV1.prototype.isUserPostShare = async function (posts, db, userId) {
    posts = await Promise.all(posts.map(async (post) => {
      let isUserPostShare = false;
      const contents = await db.postv1.count({
        where: {
          userId: userId,
          sharePostId: post.id
        }
      });

      if (contents > 0) {
        isUserPostShare = true;
      }
      post.dataValues.isUserPostShare = isUserPostShare;
      return post;
    }));

    return posts;
  };

  PostV1.prototype.isPostUser = async function (posts, db, userId) {
    posts = await Promise.all(posts.map(async (post) => {
      let isPostUser = false;
      const contents = await db.postv1.findOne({
        where: {
          id: post.id,
          userId: userId
        }
      });

      if (contents) {
        isPostUser = true;
      }
      post.dataValues.isPostUser = isPostUser;
      return post;
    }));

    return posts;
  };

  return PostV1;
};
