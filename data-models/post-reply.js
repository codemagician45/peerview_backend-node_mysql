'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostReply = sequelize.define('postReply', {
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
    tableName: 'post_reply',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostReply.associate = function (models) {
    this.belongsTo(models.post);
    this.belongsTo(models.user);
    this.belongsTo(models.postPollOption);
    this.belongsTo(models.postReply, {
      foreignKey: 'quoteReplyId',
      as: 'quoteReply'
    });
    this.hasMany(models.postReplyLike, {
      as: 'postReplyLike'
    });
    this.hasMany(models.postReplyRating, {
      as: 'postReplyRating'
    });
  };

  PostReply.prototype.isUserPostLike = async function (postReplies, db, userId) {
    postReplies = await Promise.all(postReplies.map(async (reply) => {
      let isUserPostLike = false;
      const contents = await db.postReplyLike.count({
        where: {
          userId: userId,
          postReplyId: reply.id
        }
      });

      if (contents > 0) {
        isUserPostLike = true;
      }
      postReplies.dataValues.isUserPostLike = isUserPostLike;
      return postReplies;
    }));

    return postReplies;
  };

  return PostReply;
};
