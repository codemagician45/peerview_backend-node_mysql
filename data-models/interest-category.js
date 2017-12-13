'use strict';

module.exports = function (sequelize, dataTypes) {
  const InterestCategory = sequelize.define('interestCategory', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      unique: true
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'interest_category',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  InterestCategory.asssociate = function (models) {
    this.hasMany(models.interest);
  };

  return InterestCategory;
};
