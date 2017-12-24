'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostPageview = sequelize.define('campusPostPageview', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'campus_post_pageview',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPostPageview.associate = function (models) {
    this.belongsTo(models.campusPost);
    this.belongsTo(models.user);
  };

  return CampusPostPageview;
};
