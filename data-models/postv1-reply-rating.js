'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostV1ReplyRating = sequelize.define('postv1ReplyRating',
    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: dataTypes.FLOAT
      }
    },
    {
      tableName: 'postv1_reply_rating',
      timestamp: true,
      collate: 'utf8_unicode_ci',
      indexes: []
    }
  );

  PostV1ReplyRating.associate = function (models) {
    this.belongsTo(models.reply);
    this.belongsTo(models.user);
  };
  return PostV1ReplyRating;
};
