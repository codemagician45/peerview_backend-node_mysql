'use strict';

/**
 * This are attachments in every upload capabilities
 * Basically a separation of the message and
 * its attachment media. It will be used for event
 * and event-post(ex). So that we can differient what is the
 * usage of a certain media; ex.
 * cloudinary = [{
 *    id: cloudinary_public_id_here,
 *    usage: 'image'| 'poster' | 'video'
 * }]
 *
 */

module.exports = function (sequelize, dataTypes) {
  const Attachment = sequelize.define('attachment', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    usage: {
      type: new dataTypes.ENUM('image', 'poster', 'video')
    },
    cloudinaryPublicId: {
      type: dataTypes.STRING,
    }
  }, {
    tableName: 'attachment',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Attachment.associate = function (models) {
    this.belongsTo(models.post, {
      foreignKey: 'postId'
    });

    this.belongsTo(models.postv1, {
      foreignKey: 'postv1Id'
    });
  };

  return Attachment;
};
