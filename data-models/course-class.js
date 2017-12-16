'use strict';

module.exports = function (sequelize, dataTypes) {
  const CourseClass = sequelize.define('courseClass', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'course_class',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CourseClass;
};
