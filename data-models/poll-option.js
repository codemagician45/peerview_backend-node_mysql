'use strict';

module.exports = function (sequelize, dataTypes) {
  const PollOption = sequelize.define('pollOption', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }, {
    tableName: 'poll_option',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  PollOption.associate = function (models) {
    this.belongsTo(models.poll);
  };

  return PollOption;
};
