'use strict';

module.exports = function (sequelize, dataTypes) {
  const Forum = sequelize.define('forum', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    tags: {
      type: dataTypes.STRING
    },
    viewCount: {
      type: dataTypes.INTEGER
    },
    shareCount: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'forum',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Forum.associate = function (models) {
    this.belongsTo(models.course);
    this.belongsTo(models.user);
  };

  return Forum;
};
