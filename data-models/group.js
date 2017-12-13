'use strict';

module.exports = function (sequelize, dataTypes) {
  const Group = sequelize.define('group', {
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
    image: {
      type: dataTypes.STRING
    },
    adminEmail: {
      type: dataTypes.STRING
    },
    isActive: {
      type: dataTypes.BOOLEAN
    },
    isApproved: {
      type: dataTypes.BOOLEAN
    }
  }, {
    tableName: 'group',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Group.associate = function (models) {
    this.belongsTo(models.institution);
    this.belongsTo(models.privacy);
  };

  return Group;
};
