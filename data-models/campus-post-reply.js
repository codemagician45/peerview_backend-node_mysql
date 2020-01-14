'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostReply = sequelize.define('campusPostReply', {
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
    tableName: 'campus_post_reply',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPostReply.associate = function (models) {
    this.belongsTo(models.campusPost);
    this.belongsTo(models.user);
    this.belongsTo(models.campusPostPollOption);
  };

  return CampusPostReply;
};
