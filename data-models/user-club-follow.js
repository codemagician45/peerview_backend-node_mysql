'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserClubFollow = sequelize.define('userClubFollow', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'user_club_follow',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  // UserClubFollow.associate = function (models) {
  //   this.belongsTo(models.societyClub);
  // };

  return UserClubFollow;
};
