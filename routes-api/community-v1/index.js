'use strict';

const express = require('express');
const router = new express.Router();
const listApi = require('./list');

const communityApi = (api) => {
  api.use('/community', router);

  listApi(router);
};

module.exports = communityApi;
