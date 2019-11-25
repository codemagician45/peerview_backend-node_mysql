'use strict';

/**
 * @author Alex Lu
 * @description Post Job
 */

const lib = require('../../lib');
const moment = require('moment');

/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function validateParams(req, res, next) {
    let bodySchema = {};

    bodySchema = {
        title: {
            isLength: {
                options: [{
                    min: 1,
                    max: 255
                }],
                errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
            },
            notEmpty: {
                errorMessage: 'Missing Resource: Title'
            }
        },
        company: {
            optional: true,
            isLength: {
                options: [{
                    min: 1,
                    max: 255
                }],
                errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
            }
        },
        company_bio: {
            optional: true,
        },
        country: {
            optional: true,
            isLength: {
                options: [{
                    min: 1,
                    max: 255
                }],
                errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
            }
        },
        city: {
            optional: true,
            isLength: {
                options: [{
                    min: 1,
                    max: 255
                }],
                errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
            }
        },
        contact: {
            optional: true,
            isLength: {
                options: [{
                    min: 1,
                    max: 255
                }],
                errorMessage: `Invalid Resource: Minimum 1 and maximum 280 characters are allowed`
            }
        },
        type: {
            notEmpty: {
                errorMessage: 'Missing Resource: Type'
            },
            isInt: {
                errorMessage: 'Invalid Resource: type'
            }
        },
        experience: {
            notEmpty: {
                errorMessage: 'Missing Resource: Experience'
            }
        },
        jobfunction: {
            notEmpty: {
                errorMessage: 'Missing Resource: Job Function'
            }
        },
        deadline: {
            optional: true
        }
    };

    req.checkBody(bodySchema);
    return req.getValidationResult()
        .then(validationErrors => {
            if (validationErrors.array().length !== 0) {
                return res.status(400)
                    .send(new lib.rpc.ValidationError(validationErrors.array()));
            }

            return next();
        })
        .catch(error => {
            res.status(500)
                .send(new lib.rpc.InternalError(error));
        });
}

/**
 * This would be the fallback if the user existed
 * @see {@link lib/isUserTokenExist}
 * @see isUserTokenExist
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function postJob(req, res, next) {
    let user = req.$scope.user;
    let title = req.$params.title;
    let company = req.$params.company;
    let company_bio = req.$params.company_bio;
    let country = req.$params.country;
    let city = req.$params.city;
    let contact = req.$params.contact;
    let type = req.$params.type;
    let experience = req.$params.experience;
    let jobfunction = req.$params.jobfunction;
    let deadline = req.$params.deadline;

    return req.db.job.create({
        userId: user.id,
        title: title,
        company: company,
        company_bio: company_bio,
        country: country,
        city: city,
        contact: contact,
        type: type,
        experience: experience,
        jobfunction: jobfunction,
        deadline: deadline
    })
        .then(job => {
            req.$scope.job = job;
            next();
            return job;
        })
        .catch(error => {
            res.status(500)
                .send(new lib.rpc.InternalError(error));

            req.log.error({
                err: error.message
            }, 'post.create Error - post-post');
        });
}

/**
 * Response data to client
 * @param {any} req request object
 * @param {any} res response object
 * @returns {any} body response object
 */
function response(req, res) {
    let job = req.$scope.job;

    let body = {
        status: 'SUCCESS',
        status_code: 0,
        http_code: 201,
        data: job
    };

    res.status(201).send(body);
}

module.exports.validateParams = validateParams;
module.exports.logic = postJob;
module.exports.response = response;
