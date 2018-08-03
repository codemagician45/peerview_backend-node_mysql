'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusCourse = sequelize.define('campusCourse', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'campus_course',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusCourse.associate = function (models) {
    this.belongsTo(models.course);
    this.belongsTo(models.campus);
  };

  return CampusCourse;
};
