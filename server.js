'use strict';

const express = require('express');
const bodyParser  = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const config = require(__dirname + '/config');
const log = require('bunyan').createLogger(config.appLog);
let app = express();
let db = require(__dirname + '/lib/db');

require('./config/passport.js')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.db = db.models;
app.use(function setupScope (req, res, next) {
  req.$scope = {};
  req.db = app.db;
  req.sequelize = db;
  req.Op = db.Sequelize.Op;
  req.log = log;

  next();
});

app.use(function trafficLogger (req, res, next) {
  req.log.info({req: req}, 'HTTP Request');
  res.once('finish', function resLogger () {
    req.log.info({res: res}, 'HTTP Response');
  });

  next();
});

module.exports = app;
