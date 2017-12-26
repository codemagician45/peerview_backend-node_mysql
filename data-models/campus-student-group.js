'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusStudentGroup = sequelize.define('campusStudentGroup', {
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
    },
    adminEmail: {
      type: dataTypes.STRING
    },
    logo: {// cloudinaryPublicId
      type: dataTypes.STRING
    },
    isConfirm: {// this is used for public groups
      type: dataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'campus_student_group',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusStudentGroup.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campus);
    this.belongsTo(models.campusPrivacy);
    this.hasMany(models.campusStudentGroupUser, {
      as: 'campusStudentGroupUser'
    });
  };

  return CampusStudentGroup;
};
