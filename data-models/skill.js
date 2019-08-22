'use strict';

module.exports = function (sequelize, dataTypes) {
    const Skill = sequelize.define('skill', {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    }, {
        tableName: 'skill',
        timestamp: true,
        collate: 'utf8_unicode_ci',
        indexes: []
    });

    Skill.associate = function (models) {
        this.hasMany(models.userSkill);
    };

    return Skill;
};
