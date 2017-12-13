'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPost = sequelize.define('campusPost', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campusPost',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPost.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campus);
    // this.belongsTo(models.userType);
    // this.belongsTo(models.course);
    this.hasMany(models.campusPostLike);
    this.hasMany(models.campusPostRating);
    this.hasMany(models.campusPostReply);
  };

  return CampusPost;
};
