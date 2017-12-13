'use strict';

module.exports = function (sequelize, dataTypes) {
  const BrainStorming = sequelize.define('brainstorming', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    topicName: {
      type: dataTypes.STRING
    },
    classId: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'brainstorming',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  BrainStorming.associate = function (models) {
    this.hasOne(models.brainstormingDetail);
    this.belongsTo(models.user);
    this.belongsTo(models.course);
    this.belongsTo(models.forum);
  };

  return BrainStorming;
};
