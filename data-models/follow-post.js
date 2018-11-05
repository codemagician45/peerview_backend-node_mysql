'use strict';

module.exports = function (sequelize, dataTypes) {
  const FollowPost = sequelize.define('followPost', {}, {
    tableName: 'follow_post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: [],
    instanceMethods: {}
  });

  return FollowPost;
};
