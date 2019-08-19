'use strict';

module.exports = function (sequelize, dataTypes) {
    const WorkExperience = sequelize.define('workExperience', {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        role: {
            type: dataTypes.STRING
        }
    }, {
            tableName: 'work_experience',
            timestamp: true,
            collate: 'utf8_unicode_ci',
            indexes: []
        });

    WorkExperience.associate = function (models) {
        this.belongsTo(models.user);
    };

    return WorkExperience;
};
