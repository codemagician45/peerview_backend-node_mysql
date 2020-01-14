/*eslint-disable max-len*/
'use strict';

const handlers = require('../../handlers');
const lib = require('../../lib');

let listApi = (api) => {
  api.get('/list',
    lib.isTokenExist.user,
    handlers.community.getCommunityList.logic,
    handlers.community.getCommunityList.response);
};

module.exports = listApi;
