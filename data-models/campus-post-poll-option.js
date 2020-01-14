'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostPollOption = sequelize.define('campusPostPollOption', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_post_poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPostPollOption.associate = function (models) {
    this.hasMany(models.campusPostPollOptionSummary, {
      as: 'postPollOptionSummary'
    });
  };


  return CampusPostPollOption;
};
