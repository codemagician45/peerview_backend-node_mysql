'use strict';

const express = require('express');
const router = new express.Router();
const replyApi = require('./reply');

const postApi = (api) => {
  api.use('/post', router);

  replyApi(router);
};

module.exports = postApi;
