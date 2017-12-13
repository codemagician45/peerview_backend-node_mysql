'use strict';

module.exports = function (sequelize, dataTypes) {
  const BookTransaction = sequelize.define('bookTransaction', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: dataTypes.STRING
    },
    transId: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'book_transaction',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  BookTransaction.associate = function (models) {
    this.belongsTo(models.event);
    this.belongsTo(models.user);
  };

  return BookTransaction;
};
