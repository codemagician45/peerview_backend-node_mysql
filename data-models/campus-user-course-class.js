'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusUserCourseClass = sequelize.define('campusUserCourseClass', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'campus_user_course_class',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusUserCourseClass.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campusCourseClass);
  };

  return CampusUserCourseClass;
};
