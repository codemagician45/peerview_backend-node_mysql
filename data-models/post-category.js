'use strict';

/**
 * This is the category of the Post
 * Right now we have 2 caregories
 * Post
 * Story
 */

module.exports = function (sequelize, dataTypes) {
  const PostCategory = sequelize.define('postCategory', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: dataTypes.STRING,
      unique: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'post_category',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  return PostCategory;
};
