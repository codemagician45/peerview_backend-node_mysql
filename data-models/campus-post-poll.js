'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPostPoll = sequelize.define('campusPostPoll', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {// in seconds
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'campus_post_poll',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPostPoll.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campus);
    this.belongsTo(models.course);// user for course feed
    this.belongsTo(models.campusCourseClass);// use for class feed
    this.hasMany(models.campusPostPollOption);
  };

  return CampusPostPoll;
};
