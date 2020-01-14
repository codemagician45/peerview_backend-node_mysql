'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostRating = sequelize.define('campusPostRating', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'campus_post_rating',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPostRating.associate = function (models) {
    this.belongsTo(models.campusPost);
    this.belongsTo(models.user);
  };

  return CampusPostRating;
};
