'use strict';

module.exports = function (sequelize, dataTypes) {
  const TopStories = sequelize.define('topStories', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING,
      unique: true
    },
    link: {
      type: dataTypes.STRING
    },
    date: {
      type: dataTypes.DATE
    }
  }, {
    tableName: 'top_stories',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  TopStories.associate = function (models) {
    this.belongsTo(models.interest);
    this.belongsTo(models.interestCategory);
  };

  return TopStories;
};
