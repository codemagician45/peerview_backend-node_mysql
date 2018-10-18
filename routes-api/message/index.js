'use strict';

const express = require('express');
const router = new express.Router();
const defaultApi = require('./default');

const messageApi = (api) => {
  api.use('/message', router);

  defaultApi(router);
};

module.exports = messageApi;
