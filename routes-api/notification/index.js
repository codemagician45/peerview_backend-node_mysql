'use strict';

const express = require('express');
const router = new express.Router();
const listApi = require('./list');

const notificationApi = (api) => {
  api.use('/notification', router);

  listApi(router);
};

module.exports = notificationApi;
