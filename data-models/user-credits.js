'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserCredits = sequelize.define('userCredits', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    postId: {// for referrence of the star
      type: dataTypes.STRING
    },
    rating: {// for us to have a backtrack of the star
      type: dataTypes.FLOAT
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
  };

  return UserCredits;
};
