'use strict';

/**
 * @author Alex Lu
 * @description Get Users
 */

const lib = require('../../lib');

function getSkills(req, res, next) {
    return req.db.skill.findAll({})
        .then(skills => {
            let body = {
                status: 'SUCCESS',
                status_code: 0,
                http_code: 200,
                data: skills
            };

            res.status(200).send(body);
        })
        .catch(error => {
            res.status(500)
                .send(new lib.rpc.InternalError(error));

            req.log.error({
                err: error.message
            }, 'user.findAll Error - get-users');
        });
}

function addSkill(req, res, next) {
    let schema = {
        name: {
            notEmpty: {
                errorMessage: 'Missing Resource: Name'
            }
        }
    };

    req.checkBody(schema);
    return req.getValidationResult()
        .then(validationErrors => {
            if (validationErrors.array().length !== 0) {
                return res.status(400)
                    .send(new lib.rpc.ValidationError(validationErrors.array()));
            }

            let name = req.$params.name;

            req.db.skill.findAll({
                where: {
                    name : {
                        [req.Op.eq]: name
                    }
                }
            })
            .then(skills => {
                if (skills.length > 0) {
                    res.status(500)
                        .send({
                            status: 'ERROR',
                            status_code: 0,
                            http_code: 500,
                            data: 'Duplicated Skill'
                        });
                } else {
                    req.db.skill.create({
                        name: name
                    })
                    .then(skill => {
                        let body = {
                            status: 'SUCCESS',
                            status_code: 0,
                            http_code: 200,
                            data: skill
                        };
            
                        res.status(200).send(body);
                    })
                    .catch(error => {
                        res.status(500)
                            .send(new lib.rpc.InternalError(error));
            
                        req.log.error({
                            err: error.message
                        }, 'user.findAll Error - get-users');
                    }); 
                }
            })
            .catch(error => {
                res.status(500)
                    .send(new lib.rpc.InternalError(error));
            })
            
        })
        .catch(error => {
            res.status(500)
                .send(new lib.rpc.InternalError(error));
        });
}

module.exports.getSkills = getSkills;
module.exports.addSkill = addSkill;