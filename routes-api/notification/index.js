'use strict';

const express = require('express');
const router = new express.Router();
const defaultApi = require('./default');
const listApi = require('./list');

const notificationApi = (api) => {
  api.use('/notification', router);
  defaultApi(router);
  listApi(router);
};

module.exports = notificationApi;
