'use strict';

const express = require('express');
const bodyParser  = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const perfHooks = require('perf_hooks');
const config = require(__dirname + '/config');
const log = require('bunyan').createLogger(config.appLog);
let app = express();
let db = require(__dirname + '/lib/db');
let utilitites = require('./lib/utilities');

require('./config/passport.js')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  credentials: false
}));

app.db = db.models;
app.use(function setupScope (req, res, next) {
  req.$scope = {};
  req.$params = {};
  req.db = app.db;
  req.sequelize = db;
  req.Op = db.Sequelize.Op;
  req.log = log;

  next();
});

app.use(function trafficLogger (req, res, next) {
  let chunks = [];
  let resToReapply = res.end;
  let start = perfHooks.performance.now();
  let end;

  req.log.info({
    req: req
  }, 'HTTP Request');
  res.end = function (chunk) {
    if (chunk) {
      chunks.push(new Buffer(chunk));
    }

    let body = Buffer.concat(chunks).toString('utf8');
    if (utilitites.isJsonString(body)) {
      body = JSON.parse(body);
    }

    req.log.info({
      response: body
    }, 'HTTP Response');
    resToReapply.apply(res, arguments);
  };

  res.once('finish', function resLogger () {
    end = perfHooks.performance.now();
    req.log.info({
      statusCode: res
    }, 'HTTP Finish');
    req.log.info(end - start, 'Api Performance Time');
  });

  next();
});

module.exports = app;
