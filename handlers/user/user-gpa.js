'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update User Name
 */

const lib = require('../../lib');

function saveGPA(req, res, next) {

    let bodySchema = {
        gpa: {
            notEmpty: {
                errorMessage: 'Missing Resource: GPA'
            },
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
            let gpa = {gpa: req.$params.gpa};

            req.db.user.update(gpa, {
                where: {
                  id: user.id
                }
              })
              .then(user => {
                let body = {
                    status: 'SUCCESS',
                    status_code: 0,
                    http_code: 200,
                    data: user
                };

                res.status(200).send(body);
              })
              .catch(error => {
                res.status(500)
                .send(new lib.rpc.InternalError(error));
            
                req.log.error({
                  err: error.message
                }, 'user.update Error - update-user-aboutme');
              });
        })
        .catch(error => {
            res.status(500)
                .send(new lib.rpc.InternalError(error));
        });
}

module.exports.saveGPA = saveGPA;
