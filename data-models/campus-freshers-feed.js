'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusFreshersFeed = sequelize.define('campusFreshersFeed', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    schoolYearStart: {
      type: dataTypes.DATE
    },
    schoolYearEnd: {
      type: dataTypes.DATE
    }
  }, {
    tableName: 'campus_freshers_feed',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusFreshersFeed.associate = function (models) {
    this.belongsTo(models.campus);
    this.hasMany(models.campusPost);
  };

  return CampusFreshersFeed;
};
