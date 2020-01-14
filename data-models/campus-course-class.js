'use strict';

/**
 * List of class inside a course in a
 * certain campus
 */

module.exports = function (sequelize, dataTypes) {
  const CampusCourseClass = sequelize.define('campusCourseClass', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_course_class',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusCourseClass.associate = function (models) {
    this.belongsTo(models.campusCourse);
  };

  return CampusCourseClass;
};
