'use strict';

/**
 * This would lead to onboarding of the user
 * in which the user will select in 3 major type
 * 1. student
 * 2. professionals right now this is the ex-student
 * 3. institution/organization
 */

module.exports = function (sequelize, dataTypes) {
  const UserType = sequelize.define('userType', {
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
      type: dataTypes.STRING,
      unique: true
    }
  }, {
    tableName: 'user_type',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return UserType;
};
