'use strict';

const express = require('express');
const router = new express.Router();
const searchApi = require('./search');
const followApi = require('./follow');

const userApi = (api) => {
  api.use('/user', router);

  searchApi(router);
  followApi(router);
};

module.exports = userApi;
