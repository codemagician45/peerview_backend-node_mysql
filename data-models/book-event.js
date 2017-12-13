'use strict';

module.exports = function (sequelize, dataTypes) {
  const BookEvent = sequelize.define('bookEvent', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: dataTypes.INTEGER
    },
    price: {
      type: dataTypes.DECIMAL
    },
    orderId: {
      type: dataTypes.INTEGER
    }
  }, {
    tableName: 'book_event',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  BookEvent.associate = function (models) {
    this.belongsTo(models.event);
    this.belongsTo(models.user);
  };

  return BookEvent;
};
