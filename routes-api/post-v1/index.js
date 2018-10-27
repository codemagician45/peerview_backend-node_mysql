'use strict';

const express = require('express');
const router = new express.Router();
const defaultApi = require('./default');
const replyApi = require('./reply');
const listApi = require('./list');

const postApi = (api) => {
  api.use('/post', router);

  defaultApi(router);
  replyApi(router);
  listApi(router);
};

module.exports = postApi;
