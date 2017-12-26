'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusStudentGroupUser = sequelize.define('campusStudentGroupUser', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'campus_student_group_user',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusStudentGroupUser.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campusStudentGroup);
  };

  return CampusStudentGroupUser;
};
