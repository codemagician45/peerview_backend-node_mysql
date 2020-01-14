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

  CampusPost.prototype.getPOSTPOLLOPTIONS = async function (posts) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = post.sequelize.query(`
        SELECT a.id, a.name, a.rcount as count, COALESCE(a.sum, 0) as sum, COALESCE(ROUND(((a.rcount/a.sum) * 100), 2),0) as average
        FROM
        	(SELECT postPollOption.id, postPollOption.name, count(posPollOptionSummary.campusPostPollOptionId) as rcount,
        		(SELECT SUM(ab.counts) as sum
        			FROM (SELECT campusPostPollOptionId, a.rcount as counts
        				FROM
        					(SELECT campusPostPollOptionId, count(posPollOptionSummary.campusPostPollOptionId) as rcount
        						FROM campus_post_poll_option_summary as posPollOptionSummary
        						LEFT OUTER JOIN campus_post_poll_option AS postPollOption
        						ON posPollOptionSummary.campusPostPollOptionId = postPollOption.id
        						WHERE postPollOption.campusPostId = ${post.id}
        						GROUP BY posPollOptionSummary.campusPostPollOptionId) as a
        				GROUP BY campusPostPollOptionId) as ab) as sum
        		FROM campus_post_poll_option as postPollOption
        		LEFT OUTER JOIN campus_post_poll_option_summary AS posPollOptionSummary
        		ON postPollOption.id = posPollOptionSummary.campusPostPollOptionId
        		WHERE postPollOption.campusPostId = ${post.id}
        		GROUP BY postPollOption.id) as a
        `,  { type: post.sequelize.QueryTypes.SELECT});

      post.dataValues.postPollOptions = contents;
      return post;
    }));

    return posts;
  };

  CampusPost.prototype.getPOSTLIKES = async function (posts, req) {
    posts = await Promise.all(posts.map(async (post) => {
      const contents = await post
      .getPostLike({
        include: [{
          model: req.db.user
        }]
      });

      post.dataValues.postLike = contents;
      return post;
    }));

    return posts;
  };

  return CampusPost;
};
