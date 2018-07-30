'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostPollOption = sequelize.define('postPollOption', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'post_poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostPollOption.associate = function (models) {
    this.hasMany(models.postPollOptionSummary, {
      as: 'postPollOptionSummary'
    });
  };

  return PostPollOption;
};
