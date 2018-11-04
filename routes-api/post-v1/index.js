'use strict';

const express = require('express');
const router = new express.Router();
const defaultApi = require('./default');
const listApi = require('./list');
const replyApi = require('./reply');
const likeApi = require('./like');
const reportApi = require('./report');

const postApi = (api) => {
  api.use('/post', router);

  defaultApi(router);
  listApi(router);
  replyApi(router);
  likeApi(router);
  reportApi(router);
};

module.exports = postApi;
