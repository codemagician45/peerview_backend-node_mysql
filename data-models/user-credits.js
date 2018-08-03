'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserCredits = sequelize.define('userCredits', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    identifier: {// for referrence of the star
      type: dataTypes.STRING
    },
    credits: {
      type: dataTypes.FLOAT
    }
  }, {
    tableName: 'user_credits',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserCredits.associate = function (models) {
    this.belongsTo(models.user);
    this.belongsTo(models.course); // use for badges in a certain course
  };

  return UserCredits;
};
