'use strict';
const validator = require('validator');

module.exports = function (sequelize, dataTypes) {
    const CampusUser = sequelize.define('campusUser', {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        campusEmail: {
            type: dataTypes.STRING
        },
        token: {
            type: dataTypes.STRING
        },
        emailVerified: {
            type: dataTypes.BOOLEAN
        }
    }, {
        tableName: 'campus_user',
        timestamp: true,
        collate: 'utf8_unicode_ci',
        indexes: []
    });

    CampusUser.associate = function (models) {
        this.belongsTo(models.user);
        this.belongsTo(models.campus);
    };

    return CampusUser;
};
