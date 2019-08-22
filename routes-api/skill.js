/*eslint-disable max-statements,max-lines*/
'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function skillApi (apiRouter) {

    apiRouter.get('/skills',
        lib.params,
        handlers.skill.skillHandler.getSkills);
        
    apiRouter.post('/skill/add',
        lib.params,
        lib.isTokenExist.user,
        handlers.skill.skillHandler.addSkill);
}

module.exports = skillApi;
