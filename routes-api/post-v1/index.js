'use strict';

const express = require('express');
const router = new express.Router();
const defaultApi = require('./default');
const listApi = require('./list');
const replyApi = require('./reply');
const likeApi = require('./like');
const reportApi = require('./report');
const ratingApi = require('./rating');
const followApi = require('./follow');

const postApi = (api) => {
  api.use('/post', router);

  listApi(router);
  defaultApi(router);
  replyApi(router);
  likeApi(router);
  reportApi(router);
  ratingApi(router);
  followApi(router);
};

module.exports = postApi;
