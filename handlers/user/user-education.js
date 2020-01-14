'use strict';

/**
 * @author 
 * @description Update User Name
 */

const lib = require('../../lib');

function addEducation(req, res, next) {

    let bodySchema = {
        name: {
            notEmpty: {
                errorMessage: 'Missing Resource: Name'
            },
        },
        level: {
            notEmpty: {
                errorMessage: 'Missing Resource: Level'
            }
        },
        from: {
            notEmpty: {
                errorMessage: 'Missing Resource: From'
            }
        },
        to: {
            notEmpty: {
                errorMessage: 'Missing Resource: Till'
            }
        },
        major: {
            notEmpty: {
                errorMessage: 'Missing Resource: Major'
            }
        },
        minor: {
            notEmpty: {
                errorMessage: 'Missing Resource: Minor'
            }
        }
    };

    req.checkBody(bodySchema);
    return req.getValidationResult()
        .then(validationErrors => {
            if (validationErrors.array().length !== 0) {
                return res.status(400)
                    .send(new lib.rpc.ValidationError(validationErrors.array()));
            }

            let user = req.$scope.user;
            let name = req.$params.name;
            let level = req.$params.level;
            let from = req.$params.from;
            let to = req.$params.to;
            let major = req.$params.major;
            let minor = req.$params.minor;
            let department_gpa = req.$params.department_gpa;
            let cumulative_gpa = req.$params.cumulative_gpa;
            let is_hide_department_gpa = req.$params.is_hide_department_gpa;
            let is_hide_cumulative_gpa = req.$params.is_hide_cumulative_gpa;

            req.db.education.create({
                name: name,
                level: level,
                from: from,
                to: to,
                major: major,
                minor: minor,
                department_gpa: department_gpa,
                cumulative_gpa: cumulative_gpa,
                is_hide_cumulative_gpa: is_hide_cumulative_gpa,
                is_hide_department_gpa: is_hide_department_gpa,
                userId: user.id
            })
                .then(education => {
                    let body = {
                        status: 'SUCCESS',
                        status_code: 0,
                        http_code: 200,
                        data: education
                    };

                    res.status(200).send(body);
                })
                .catch(error => {
                    res.status(500)
                        .send(new lib.rpc.InternalError(error));

                    req.log.error({
                        err: error.message
                    }, 'create work experience error');
                });
        })
        .catch(error => {
            res.status(500)
                .send(new lib.rpc.InternalError(error));
        });
}

function updateEducation(req, res, next) {

    let bodySchema = {
        name: {
            notEmpty: {
                errorMessage: 'Missing Resource: Name'
            },
        },
        level: {
            notEmpty: {
                errorMessage: 'Missing Resource: Level'
            }
        },
        from: {
            notEmpty: {
                errorMessage: 'Missing Resource: From'
            }
        },
        to: {
            notEmpty: {
                errorMessage: 'Missing Resource: Till'
            }
        },
        major: {
            notEmpty: {
                errorMessage: 'Missing Resource: Major'
            }
        },
        minor: {
            notEmpty: {
                errorMessage: 'Missing Resource: Minor'
            }
        }
    };

    req.checkBody(bodySchema);
    return req.getValidationResult()
        .then(validationErrors => {
            if (validationErrors.array().length !== 0) {
                return res.status(400)
                    .send(new lib.rpc.ValidationError(validationErrors.array()));
            }

            let user = req.$scope.user;
            let name = req.$params.name;
            let level = req.$params.level;
            let from = req.$params.from;
            let to = req.$params.to;
            let major = req.$params.major;
            let minor = req.$params.minor;
            let department_gpa = req.$params.department_gpa;
            let cumulative_gpa = req.$params.cumulative_gpa;
            let is_hide_department_gpa = req.$params.is_hide_department_gpa;
            let is_hide_cumulative_gpa = req.$params.is_hide_cumulative_gpa;
            let id = req.$params.id;

            req.db.education.update({
                name: name,
                level: level,
                from: from,
                to: to,
                major: major,
                minor: minor,
                department_gpa: department_gpa,
                cumulative_gpa: cumulative_gpa,
                is_hide_cumulative_gpa: is_hide_cumulative_gpa,
                is_hide_department_gpa: is_hide_department_gpa,
                userId: user.id
            }, {
                where: {
                    id: {
                      [req.Op.eq]: id
                    }
                } 
            })
            .then(education => {
                let body = {
                    status: 'SUCCESS',
                    status_code: 0,
                    http_code: 200,
                    data: education
                };

                res.status(200).send(body);
            })
            .catch(error => {
                res.status(500)
                    .send(new lib.rpc.InternalError(error));

                req.log.error({
                    err: error.message
                }, 'create work experience error');
            });
        })
        .catch(error => {
            res.status(500)
                .send(new lib.rpc.InternalError(error));
        });
}

module.exports.addEducation = addEducation;
module.exports.updateEducation = updateEducation;
