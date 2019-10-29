'use strict';

/**
 * @author 
 * @description Update User Name
 */

const lib = require('../../lib');

function addAward(req, res, next) {

    let bodySchema = {
        position: {
            notEmpty: {
                errorMessage: 'Missing Resource: Position'
            },
        },
        organization: {
            notEmpty: {
                errorMessage: 'Missing Resource: Organization'
            }
        },
        from: {
            notEmpty: {
                errorMessage: 'Missing Resource: From'
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
            let position = req.$params.position;
            let organization = req.$params.organization;
            let from = req.$params.from;
            let to = req.$params.to;
            let current_position = req.$params.current_position;
            let location = req.$params.location;
            let description = req.$params.description;

            req.db.award.create({
                position: position,
                organization: organization,
                from: from,
                to: to,
                current_position: current_position,
                location: location,
                description: description,
                userId: user.id
            })
                .then(award => {
                    let body = {
                        status: 'SUCCESS',
                        status_code: 0,
                        http_code: 200,
                        data: award
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

function updateAward(req, res, next) {

    let bodySchema = {
        position: {
            notEmpty: {
                errorMessage: 'Missing Resource: Position'
            },
        },
        organization: {
            notEmpty: {
                errorMessage: 'Missing Resource: Organization'
            }
        },
        from: {
            notEmpty: {
                errorMessage: 'Missing Resource: From'
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
            let position = req.$params.position;
            let organization = req.$params.organization;
            let from = req.$params.from;
            let to = req.$params.to;
            let location = req.$params.location;
            let description = req.$params.description;
            let id = req.$params.id;

            req.db.award.update({
                position: position,
                organization: organization,
                from: from,
                to: to,
                current_position: current_position,
                location: location,
                description: description,
                userId: user.id
            }, {
                where: {
                    id: {
                      [req.Op.eq]: id
                    }
                } 
            })
            .then(award => {
                let body = {
                    status: 'SUCCESS',
                    status_code: 0,
                    http_code: 200,
                    data: award
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

module.exports.addAward = addAward;
module.exports.updateAward = updateAward;
