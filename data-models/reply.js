'use strict';

module.exports = function (sequelize, dataTypes) {
  const Reply = sequelize.define('reply', {
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
    tableName: 'reply',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Reply.associate = function (models) {
    this.belongsTo(models.postv1);
    this.belongsTo(models.user);
    this.belongsTo(models.reply, {
      foreignKey: 'quoteReplyId',
      as: 'quoteReply'
    });
    this.belongsTo(models.user, {
      foreignKey: 'tagUserId',
      as: 'tagUser'
    });
    this.hasMany(models.like, {
      as: 'replyLike'
    });
    this.hasMany(models.attachment, {
      foreignKey: 'replyId',
      // primaryKey: 'id',
      as: 'attachment'
    });
    this.hasMany(models.postv1ReplyRating, {
      foreignKey: 'replyId',
      // primaryKey: 'id',
      as: 'ratings'
    });
  };

  Reply.prototype.isUserPostReplyLike = async function (postReplies, db, userId) {
    postReplies = await Promise.all(postReplies.map(async (reply) => {
      let isUserPostReplyLike = false;
      const contents = await db.like.count({
        where: {
          userId: userId,
          replyId: reply.id
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

  return Reply;
};
