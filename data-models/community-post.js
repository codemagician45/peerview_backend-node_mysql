'use strict';

const validator = require('validator');

module.exports = function (sequelize, dataTypes) {
  const CommunityPost = sequelize.define('communityPost', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {// we use this in the brainstorming that is why we saved the data in json format
      type: dataTypes.TEXT,
      allowNull: true,
      get: function () {
        var rawValue = this.getDataValue('message');
        if (!rawValue) {
          return (undefined);
        } else if (validator.isJSON(rawValue)){
          return JSON.parse(rawValue);
        } else {
          return rawValue;
        }
      },
      set: function (val) {
        var json = (typeof val === 'string') ? val : JSON.stringify(val);
        this.setDataValue('message', json);
      }
    },
    title: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    },
    question: {
      type: dataTypes.STRING
    },
    duration: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'community_post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CommunityPost.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.userType);
    this.belongsTo(models.course);
    this.belongsTo(models.community); // if this field has been filed the post belongsTo private community
    this.hasMany(models.communityPostPollOption);
    this.hasMany(models.attachment);
    this.hasMany(models.communityPostLike, {
      as: 'postLike'
    });
    this.hasMany(models.communityPostRating, {
      as: 'postRating'
    });
    this.hasMany(models.communityPostReply, {
      as: 'postReply'
    });
    this.hasMany(models.communityPostPageview, {
      as: 'postPageview'
    });
  };

  return CommunityPost;
};
