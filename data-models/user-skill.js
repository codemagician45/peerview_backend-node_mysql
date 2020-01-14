'use strict';

module.exports = function (sequelize, dataTypes) {
  const UserSkill = sequelize.define('userSkill', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'user_skill',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  UserSkill.associate = function (models) {
    this.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user'
    });
    this.belongsTo(models.skill, {
      foreignKey: 'skillId',
      as: 'skill'
    });
  };

  return UserSkill;
};
