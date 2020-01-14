'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostComplaint = sequelize.define('postComplaint', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    reason: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'post_complaint',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostComplaint.associate = function (models) {
    this.belongsTo(models.post, {
      foreignKey: 'postId',
      as: 'post'
    });
    this.belongsTo(models.user, {
      foreignKey: 'userId'
    });
  };

  return PostComplaint;
};
