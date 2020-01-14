'use strict';

module.exports = function (sequelize, dataTypes) {
  const EventPost = sequelize.define('eventPost', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: dataTypes.STRING,
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'event_post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  EventPost.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.event);
    this.hasMany(models.attachment);
    this.hasMany(models.eventPostPollOption);
    this.hasMany(models.eventPostLike, {
      as: 'postLike'
    });
    this.hasMany(models.eventPostRating, {
      as: 'postRating'
    });
    this.hasMany(models.eventPostReply, {
      as: 'postReply'
    });
    this.hasMany(models.eventPostPageview, {
      as: 'postPageview'
    });
  };

  return EventPost;
};
