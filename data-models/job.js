/*eslint-disable max-len*/
'use strict';

module.exports = function (sequelize, dataTypes) {
    const Job = sequelize.define('job', {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        company: {
            type: dataTypes.STRING
        },
        company_bio: {
            type: dataTypes.TEXT
        },
        country: {
            type: dataTypes.STRING
        },
        city: {
            type: dataTypes.STRING
        },
        contact: {
            type: dataTypes.STRING
        },
        type: {
            type: dataTypes.INTEGER
        },
        experience: {
            type: dataTypes.TEXT
        },
        jobfunction: {
            type: dataTypes.TEXT
        },
        deadline: {
            type: dataTypes.DATE
        },
        source_link: {
            type: dataTypes.TEXT
        }
    }, {
        tableName: 'job',
        timestamp: true,
        collate: 'utf8_unicode_ci',
        indexes: []
    });

    Job.associate = function (models) {
        this.belongsTo(models.user, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Job;
};
