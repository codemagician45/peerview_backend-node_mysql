'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPoll = sequelize.define('campusPoll', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {// in seconds
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'campus_poll',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPoll.associate = function (models) {
    this.belongsTo(models.user);
    this.hasMany(models.campusPollOption);
  };

  return CampusPoll;
};
