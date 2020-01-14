'use strict';

/**
 * @author Jo-Ries Canino
 * @description PUT User
 */

const lib = require('../../lib');
const templates = require('../../templates');

/**
 * Validation of req.body, req, param,
 * and req.query
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next next object
 * @returns {next} returns the next handler - success response
 * @returns {rpc} returns the validation error - failed response
 */
function sendEmailVerifyCode (req, res, next) {
  let bodySchema = {
    email: {
      notEmpty: {
        errorMessage: 'Missing Resource: Email'
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
    let email = req.$params.email;
    let username = user.firstName;
    let code = Math.floor(1000 + Math.random() * 9000);

    req.db.user.findAll({
        where: {
            email: {
                [req.Op.eq]: email
            }
        }
    }).then(users => {
        if(users.length > 0) {
            res.status(500)
            .send('Email Already Exist');
        
            req.log.error({
              err: error.message
            }, 'user.update Error - update-user-accomplishments');
        } else {
            req.db.user.update({email_verify_code: code}, {
                where: {
                  id: user.id
                }
              })
              .then(user => {
                let file = templates.emailVerifyCode;
                
                let values = {
                    name: `${username}`,
                    code: code
                };
        
                lib.pug.convert(file, values).then((content) => {
                    return lib.email.send(`Email Verification`, email, content);
                });
        
                let body = {
                    status: 'SUCCESS',
                    status_code: 1,
                    http_code: 200
                };
                
                res.status(200).send(body);
        
              })
              .catch(error => {
                res.status(500)
                .send(new lib.rpc.InternalError(error));
            
                req.log.error({
                  err: error.message
                }, 'user.update Error - update-user-accomplishments');
              });
        }
    }).catch(error => {
        res.status(500)
        .send(new lib.rpc.InternalError(error));
    
        req.log.error({
          err: error.message
        }, 'user.update Error - update-user-accomplishments');
    })
    
      
  })
  .catch(error => {
    res.status(500)
    .send(new lib.rpc.InternalError(error));
  });
}

module.exports.logic = sendEmailVerifyCode;
