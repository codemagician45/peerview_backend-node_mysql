'use strict';

module.exports = function (sequelize, dataTypes) {
  const Poll = sequelize.define('poll', {
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
    tableName: 'poll',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Poll.associate = function (models) {
    this.belongsTo(models.user);
    this.hasMany(models.pollOption);
    this.hasMany(models.pollResponse);
  };

  return Poll;
};
