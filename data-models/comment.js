'use strict';

module.exports = function (sequelize, dataTypes) {
  const Comment = sequelize.define('comment', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: dataTypes.STRING
    },
  }, {
    tableName: 'comment',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return Comment;
};
