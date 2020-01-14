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
    },
    isConfirm: {// the admin needs to validate this first
      type: dataTypes.BOOLEAN,
      defaultValue: false
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
