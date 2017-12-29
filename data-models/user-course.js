'use strict';

/**
 * This is the course of the student
 * or the course the ex-student(professionals) in which
 * the ex-student can have many course or field
 * of expertise
 */

module.exports = function (sequelize, dataTypes) {
  const UserCourse = sequelize.define('userCourse', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'user_course',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserCourse.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.course);
  };

  return UserCourse;
};
