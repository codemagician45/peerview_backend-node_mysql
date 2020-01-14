'use strict';

module.exports = function (sequelize, dataTypes) {
    const award = sequelize.define('award', {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        position: {
            type: dataTypes.STRING
        },
        organization: {
            type: dataTypes.STRING
        },
        from: {
            type: dataTypes.DATE
        },
        to: {
            type: dataTypes.DATE
        },
        current_position: {
            type: dataTypes.BOOLEAN
        },
        location: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        }
    }, {
            tableName: 'award',
            timestamp: true,
            collate: 'utf8_unicode_ci',
            indexes: []
        });

    award.associate = function (models) {
        this.belongsTo(models.user);
    };

    return award;
};
