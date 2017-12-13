'use strict';

module.exports = function (sequelize, dataTypes) {
  const CampusPollOption = sequelize.define('campusPollOption', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'campus_poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPollOption.associate = function (models) {
    this.belongsTo(models.campusPoll);
  };

  return CampusPollOption;
};
