'use strict';

module.exports = function (sequelize, dataTypes) {
    const education = sequelize.define('education', {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        level: {
            type: dataTypes.STRING
        },
        from: {
            type: dataTypes.DATE
        },
        to: {
            type: dataTypes.DATE
        },
        major: {
            type: dataTypes.STRING
        },
        minor: {
            type: dataTypes.STRING
        },
        department_gpa: {
            type: dataTypes.STRING
        },
        cumulative_gpa: {
            type: dataTypes.STRING
        },
        is_hide_department_gpa: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        is_hide_cumulative_gpa: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
            tableName: 'education',
            timestamp: true,
            collate: 'utf8_unicode_ci',
            indexes: []
        });

    education.associate = function (models) {
        this.belongsTo(models.user);
    };

    return education;
};
