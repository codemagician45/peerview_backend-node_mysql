'use strict';
const validator = require('validator');

module.exports = function (sequelize, dataTypes) {
  const CampusPost = sequelize.define('campusPost', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {// we use this in the brainstorming that is why we saved the data in json format
      type: dataTypes.TEXT,
      allowNull: false,
      get: function () {
        var rawValue = this.getDataValue('message');
        if (!rawValue) {
          return (undefined);
        } else if (validator.isJSON(rawValue)){
          return JSON.parse(rawValue);
        } else {
          return rawValue;
        }
      },
      set: function (val) {
        var json = (typeof val === 'string') ? val : JSON.stringify(val);
        this.setDataValue('message', json);
      }
    }
  }, {
    tableName: 'campus_post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPost.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campus);
    this.belongsTo(models.course);// use for course feed
    this.belongsTo(models.campusCourseClass);// use for class feed
    this.belongsTo(models.campusSocietyClub);
    this.belongsTo(models.campusStudentGroup);
    this.hasMany(models.campusPostLike, {
      as: 'campusPostLike'
    });
    this.hasMany(models.campusPostRating, {
      as: 'campusPostRating'
    });
    this.hasMany(models.campusPostReply, {
      as: 'campusPostReply'
    });
    this.hasMany(models.campusPostPageview, {
      as: 'campusPostPageview'
    });
  };

  return CampusPost;
};
