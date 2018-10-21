'use strict';

/**
 * @description Act as a mentor in campus
 */
module.exports = function (sequelize, dataTypes) {
  const Mentor = sequelize.define('mentor', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    topic: {
      type: dataTypes.BLOB
    },
    tellUsWhy: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'mentor',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Mentor.associate = function (models) {
    this.belongsTo(models.campus);
  };

  return Mentor;
};
