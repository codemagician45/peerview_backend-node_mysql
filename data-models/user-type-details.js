'use strict';

/**
 * This are the details associated on which user
 * type you are belong
 */

module.exports = function (sequelize, dataTypes) {
  const UserTypeDetails = sequelize.define('userTypeDetails', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
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
    tableName: 'user_type_details',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserTypeDetails.associate = function (models) {
    this.belongsTo(models.course);
    this.belongsTo(models.userStudyLevel);
    this.belongsTo(models.userType);
  };

  return UserTypeDetails;
};
