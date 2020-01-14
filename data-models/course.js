'use strict';

module.exports = function (sequelize, dataTypes) {
  const Course = sequelize.define('course', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: dataTypes.STRING,
      unique: true
    },
    name: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'course',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return Course;
};
