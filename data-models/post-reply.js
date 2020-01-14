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
    this.hasMany(models.postReply, {
      foreignKey: 'quoteReplyId',
      as: 'postReplyComments'
    });
    this.hasMany(models.postReplyLike, {
      as: 'postReplyLike'
    });
    this.hasMany(models.postReplyRating, {
      as: 'postReplyRating'
    });
  };

  PostReply.prototype.isUserPostReplyLike = async function (postReplies, db, userId) {
    postReplies = await Promise.all(postReplies.map(async (reply) => {
      let isUserPostReplyLike = false;
      const contents = await db.postReplyLike.count({
        where: {
          userId: userId,
          postReplyId: reply.id
        }
      });

      if (contents > 0) {
        isUserPostReplyLike = true;
      }
      reply.dataValues.isUserPostReplyLike = isUserPostReplyLike;
      return reply;
    }));

    return postReplies;
  };

  PostReply.prototype.isUserPostReplyRating = async function (postReplies, db) {
    postReplies = await Promise.all(postReplies.map(async (reply) => {
      const colRating = sequelize.col('postReplyRating.rating');
      const colAVG = sequelize.fn('AVG', colRating);
      const contents = await db.postReplyRating.findOne({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('userId')), 'ratingCount'],
          [sequelize.fn('ROUND', colAVG, 2), 'roundedRating']
        ],
        where: {
          postReplyId: reply.id
        }
      });
      reply.dataValues.postReplyRating = contents;
      return reply;
    }));

    return postReplies;
  };
  return PostReply;
};
