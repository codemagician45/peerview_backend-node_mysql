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
    this.hasMany(models.eventAttachment);
    this.hasMany(models.eventPostLike, {
      as: 'eventPostLike'
    });
    this.hasMany(models.eventPostRating, {
      as: 'eventPostRating'
    });
    this.hasMany(models.eventPostReply, {
      as: 'eventPostReply'
    });
    this.hasMany(models.eventPostPageview, {
      as: 'eventPostPageview'
    });
  };

  return EventPost;
};
