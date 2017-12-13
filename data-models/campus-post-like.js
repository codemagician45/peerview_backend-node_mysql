'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostLike = sequelize.define('campusPostLike', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'campus_post_like',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPostLike.associate = function (models) {
    this.belongsTo(models.campusPost);
    this.belongsTo(models.user);
  };

  return CampusPostLike;
};
