'use strict';

const express = require('express');
const router = new express.Router();
const defaultApi = require('./default');
const replyApi = require('./reply');

const postApi = (api) => {
  api.use('/post', router);

  defaultApi(router);
  replyApi(router);
};

module.exports = postApi;
