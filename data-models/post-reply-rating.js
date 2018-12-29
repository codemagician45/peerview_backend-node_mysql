'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostReplyRating = sequelize.define('postReplyRating', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'post_reply_rating',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostReplyRating.associate = function (models) {
    this.belongsTo(models.postReply);
    this.belongsTo(models.user);
  };

  return PostReplyRating;
};
