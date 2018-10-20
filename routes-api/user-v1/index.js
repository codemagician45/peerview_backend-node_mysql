'use strict';

const express = require('express');
const router = new express.Router();
const searchApi = require('./search');

const userApi = (api) => {
  api.use('/user', router);

  searchApi(router);
};

module.exports = userApi;
