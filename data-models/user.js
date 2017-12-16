'use strict';

module.exports = function (sequelize, dataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: dataTypes.STRING
    },
    lastName: {
      type: dataTypes.STRING
    },
    password: {
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING
    },
    language: {
      type: dataTypes.STRING
    },
    aboutMe: {
      type: dataTypes.STRING
    },
    token: {
      type: dataTypes.STRING
    },
    tokenActiveDate: {
      type: dataTypes.DATE
    },
    isSuspended: {
      type: dataTypes.BOOLEAN
    },
    profilePicture: {
      type: dataTypes.STRING
    },
    profilePrivacy: {// direct Message
      type: dataTypes.BOOLEAN,
      defaultValue: 0
    },
    protectPost: {
      type: dataTypes.BOOLEAN,
      defaultValue: 1
    },
    facebookId: {
      type: dataTypes.STRING
    },
    linkedinId: {
      type: dataTypes.STRING
    },
    googleId: {
      type: dataTypes.STRING
    },
    schoolName: {
      type: dataTypes.STRING
    },
    birthDate: {
      type: dataTypes.DATE
    },
    city: {
      type: dataTypes.STRING
    },
    gender: {
      type: dataTypes.STRING
    },
    role: {// start of ex-student which includes birthDate and city
      type: dataTypes.STRING
    },
    company: {
      type: dataTypes.STRING
    },
    institutionName: {// start of institution or organization which includes city
      type: dataTypes.STRING
    },
    yearOfIncorporation: {
      type: dataTypes.DATE
    },
    website: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'user',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  User.associate = function (models) {
    this.belongsTo(models.userStudyLevel);
    this.belongsTo(models.userType);
    this.belongsTo(models.userPrivacy);// who can view my profile
    // this.belongsTo(models.userTypeDetails);
    // this.belongsTo(models.campus);
    // this.hasMany(models.group);
    // this.hasMany(models.event);
    // this.hasMany(models.bookEvent);
    // this.hasMany(models.bookTransaction);
    // this.hasMany(models.commentLike);
    // this.hasMany(models.inbox);
    // this.hasMany(models.societyClubFollow);
  };

  return User;
};
