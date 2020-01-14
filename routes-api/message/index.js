'use strict';

const express = require('express');
const router = new express.Router();
const defaultApi = require('./default');
const listApi = require('./list');

const messageApi = (api) => {
  api.use('/message', router);

  defaultApi(router);
  listApi(router);
};

module.exports = messageApi;
