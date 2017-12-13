'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusMarketplace = sequelize.define('campusMarketplace', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING
    },
    descripton: {
      type: dataTypes.STRING
    },
    phone: {
      type: dataTypes.STRING
    },
    image: {
      type: dataTypes.STRING
    },
    location: {
      type: dataTypes.STRING
    },
    author: {
      type: dataTypes.STRING
    },
    edition: {
      type: dataTypes.STRING
    },
    price: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'campus_marketplace',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusMarketplace.associate = function (models) {
    this.belongsTo(models.campus);
    this.belongsTo(models.user);
  };

  return CampusMarketplace;
};
