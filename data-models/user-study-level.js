'use strict';

/**
 * This is the list of user status in
 * in the level of study ex.
 * Postgraduate
 * Undergraduate
 * Postsecondary
 */

module.exports = function (sequelize, dataTypes) {
  const UserStudyLevel = sequelize.define('userStudyLevel', {
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
    }
  }, {
    tableName: 'user_study_level',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return UserStudyLevel;
};
