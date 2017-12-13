'use strict';

module.exports = function (sequelize, dataTypes) {
  const PostPageview = sequelize.define('postPageview', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'post_pageview',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PostPageview.associate = function (models) {
    this.belongsTo(models.post);
    this.belongsTo(models.user);
  };

  return PostPageview;
};
