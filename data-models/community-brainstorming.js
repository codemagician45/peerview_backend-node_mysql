'use strict';

/**
 * This model will save the mind mapping object
 * which is a json object;
 */

module.exports = function (sequelize, dataTypes) {
  const CommunityBrainStorming = sequelize.define('communityBrainstorming', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    jsonData: {
      type: dataTypes.TEXT,
      allowNull: false,
      get: function () {
        var rawValue = this.getDataValue('jsonData');
        if (!rawValue) {
          return (undefined);
        } else {
          return JSON.parse(rawValue);
        }
      },
      set: function (val) {
        var json = (typeof val === 'string') ? val : JSON.stringify(val);
        this.setDataValue('jsonData', json);
      }
    }
  }, {
    tableName: 'community_brainstorming',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityBrainStorming.associate = function (models) {
    CommunityBrainStorming.belongsTo(models.community);
  };

  return CommunityBrainStorming;
};
