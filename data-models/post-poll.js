'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostPoll = sequelize.define('postPoll', {
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
    tableName: 'post_poll',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostPoll.associate = function (models) {
    this.belongsTo(models.user);
    this.hasMany(models.postPollOption);
  };

  return PostPoll;
};
