'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostRating = sequelize.define('postRating', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    rating: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'post_rating',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostRating.associate = function (models) {
    this.belongsTo(models.post);
    this.belongsTo(models.user);
  };

  return PostRating;
};
