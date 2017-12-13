'use strict';

module.exports = function (sequelize, dataTypes) {
  const SocietyClubFollow = sequelize.define('societyClubFollow', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'society_club_follow',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return SocietyClubFollow;
};
