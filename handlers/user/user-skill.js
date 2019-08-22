'use strict';

/**
 * @author Jo-Ries Canino
 * @description Update User Name
 */

const lib = require('../../lib');

function addSkill(req, res, next) {

    let user = req.$scope.user;
    let items = req.$params.items;
   
    req.db.userSkill.destroy({
        where : {
            userId: {
                [req.Op.eq]: user.id
            }
        }
    })
    .then(skills => {
        let userSkillsData = [];

        for(let i=0; i<items.length; i++) {
            if(items[i].id) {
                userSkillsData.push({userId: user.id, skillId: items[i].id});
            }
        }

        req.db.userSkill.bulkCreate(userSkillsData)
        .then(userskills => {
            let body = {
                status: 'SUCCESS',
                status_code: 0,
                http_code: 200,
                data: userskills
            };
    
            res.status(200).send(body);
        })
        .catch(error => {
            res.status(500)
            .send(new lib.rpc.InternalError(error));

            req.log.error({
                err: error.message
            }, 'create work experience error');
        })
        
    })
    .catch(error => {
        res.status(500)
            .send(new lib.rpc.InternalError(error));

        req.log.error({
            err: error.message
        }, 'add skill error');
    });
       
}

module.exports.addSkill = addSkill;
