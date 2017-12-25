'use strict';
/**
 * This is the level of privacy of the
 * group inside Student group
 * 1-public -> Visible to everyone
 * (Note - Public group is subject to confirmation by Admin)
 * 2-private -> User must request to join group
 * 3-secret -> User must receive invite before they can join
 */

module.exports = function (sequelize, dataTypes) {
  const CampusPrivacy = sequelize.define('campusPrivacy', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_privacy',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return CampusPrivacy;
};
