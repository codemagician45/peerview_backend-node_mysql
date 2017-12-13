'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusMarketplacePhotos = sequelize.define('campusMarketplacePhotos', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_marketplace_photos',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusMarketplacePhotos.associate = function (models) {
    this.belongsTo(models.campusMarketplace);
  };

  return CampusMarketplacePhotos;
};
