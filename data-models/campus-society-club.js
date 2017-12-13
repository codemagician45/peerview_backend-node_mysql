'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusSocietyClub = sequelize.define('campusSocietyClub', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    cloudinaryPublicId: {
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
    this.belongsTo(models.privacy);
  };

  return CampusSocietyClub;
};
