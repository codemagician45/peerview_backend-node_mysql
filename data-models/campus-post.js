'use strict';
const validator = require('validator');

module.exports = function (sequelize, dataTypes) {
  const CampusPost = sequelize.define('campusPost', {
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
    question: {
      type: dataTypes.STRING
    },
    duration: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'campus_post',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  CampusPost.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.campus);
    this.belongsTo(models.course);// use for course feed
    this.belongsTo(models.campusCourseClass);// use for class feed
    this.belongsTo(models.campusSocietyClub);
    this.belongsTo(models.campusStudentGroup);
    this.hasMany(models.attachment);
    this.hasMany(models.campusPostPollOption, {
      as: 'postPollOption'
    });
    this.hasMany(models.campusPostLike, {
      as: 'postLike'
    });
    this.hasMany(models.campusPostRating, {
      as: 'postRating'
    });
    this.hasMany(models.campusPostReply, {
      as: 'postReply'
    });
    this.hasMany(models.campusPostPageview, {
      as: 'postPageview'
    });
  };

  CampusPost.prototype.getPOSTREPLY = async function (posts, model) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await post
      .getPostReply({
        limit: 5,
        attributes: ['comment', 'createdAt'],
        include: [{
          model: model.user,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }],
        order: [['createdAt', 'DESC']]
      });

      post.dataValues.postReply = contents;
      return post;
    }));

    return posts;
  };

  CampusPost.prototype.getATTACHMENTS = async function (posts) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await post
      .getAttachments({
        attributes: ['id', 'usage', 'cloudinaryPublicId']
      });

      post.dataValues.attachments = contents;
      return post;
    }));

    return posts;
  };

  CampusPost.prototype.getPOSTPOLLOPTIONS = async function (posts, model) {
    posts = await Promise.all(posts.map(async (post) => {
      const colCount = sequelize.fn('COUNT',
        sequelize.col('postPollOptionSummary.campusPostPollOptionId'));

      const contents = await post
      .getPostPollOption({
        attributes: {
          include: [
            'id',
            'name',
            [colCount, 'count'],
          ]
        },
        include: [{
          model: model.campusPostPollOptionSummary,
          as: 'postPollOptionSummary',
          attributes: []
        }],
        group: ['campusPostPollOption.id'],
      });

      post.dataValues.postPollOptions = contents;
      return post;
    }));

    return posts;
  };

  return CampusPost;
};
