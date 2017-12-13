'use strict';

module.exports = function (sequelize, dataTypes) {
  const BrainStormingDetail = sequelize.define('brainstormingDetail', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    },
    nodecolor: {
      type: dataTypes.STRING
    },
    nodeshape: {
      type: dataTypes.STRING
    },
    parentid: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'brainstorming_detail',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  BrainStormingDetail.associate = function (models) {
    this.belongsTo(models.brainstorming);
  };

  return BrainStormingDetail;
};
