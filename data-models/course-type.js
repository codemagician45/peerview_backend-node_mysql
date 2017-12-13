'use strict';

/**
 * Initial implementation would be
 * '1-undergraduate 2-postgraduate'
 */

module.exports = function (sequelize, dataTypes) {
  const CourseType = sequelize.define('courseType', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'course_type',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CourseType;
};
