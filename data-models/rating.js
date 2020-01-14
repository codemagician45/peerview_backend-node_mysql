'use strict';

module.exports = function (sequelize, dataTypes) {
  const Rating = sequelize.define('rating', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'rating',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Rating.associate = function (models) {
    this.belongsTo(models.postv1);
    this.belongsTo(models.user);
  };

  return Rating;
};
