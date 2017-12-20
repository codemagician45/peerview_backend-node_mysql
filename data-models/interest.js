'use strict';

module.exports = function (sequelize, dataTypes) {
  const Interest = sequelize.define('interest', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'interest',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Interest.associate = function (models) {
    this.belongsTo(models.interestCategory);
  };

  return Interest;
};
