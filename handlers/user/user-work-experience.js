'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update User Name
 */

const lib = require('../../lib');

function addWorkExperience(req, res, next) {

    let bodySchema = {
        name: {
            notEmpty: {
                errorMessage: 'Missing Resource: Name'
            },
        },
        role: {
            notEmpty: {
                errorMessage: 'Missing Resource: Role'
            }
        },
        from: {
            notEmpty: {
                errorMessage: 'Missing Resource: From'
            }
        },
        till: {
            notEmpty: {
                errorMessage: 'Missing Resource: Till'
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
            let role = req.$params.role;
            let from = req.$params.from;
            let till = req.$params.till;

            req.db.workExperience.create({
                name: name,
                role: role,
                from: from,
                to: till,
                userId: user.id
            })
                .then(experience => {
                    let body = {
                        status: 'SUCCESS',
                        status_code: 0,
                        http_code: 200,
                        data: experience
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

function updateWorkExperience(req, res, next) {

    let bodySchema = {
        name: {
            notEmpty: {
                errorMessage: 'Missing Resource: Name'
            },
        },
        role: {
            notEmpty: {
                errorMessage: 'Missing Resource: Role'
            }
        },
        from: {
            notEmpty: {
                errorMessage: 'Missing Resource: From'
            }
        },
        till: {
            notEmpty: {
                errorMessage: 'Missing Resource: Till'
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
            let role = req.$params.role;
            let from = req.$params.from;
            let to = req.$params.to;
            let id = req.$params.id;

            req.db.workExperience.update({
                name: name,
                role: role,
                from: from,
                to: to,
                userId: user.id
            }, {
                where: {
                    id: {
                      [req.Op.eq]: id
                    }
                } 
            })
            .then(experience => {
                let body = {
                    status: 'SUCCESS',
                    status_code: 0,
                    http_code: 200,
                    data: experience
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

module.exports.addWorkExperience = addWorkExperience;
module.exports.updateWorkExperience = updateWorkExperience;
