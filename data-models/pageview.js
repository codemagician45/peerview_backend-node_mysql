'use strict';

module.exports = function (sequelize, dataTypes) {
  const Pageview = sequelize.define('pageview', {// eslint-disable-line id-length
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'pageview',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  Pageview.associate = function (models) {
    this.belongsTo(models.postv1);
    this.belongsTo(models.user);
  };

  return Pageview;
};
