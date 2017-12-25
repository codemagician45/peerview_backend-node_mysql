'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusSocietyClub = sequelize.define('campusSocietyClub', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    logo: {// cloudinaryPublicId
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_society_club',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusSocietyClub.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campus);
  };

  return CampusSocietyClub;
};
