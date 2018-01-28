'use strict';

/**
 * Development environment config of any configuration required to setup
 * the application which includes db, etc for developer purposes.
 */
const path = require('path');
const url = require('url');
const sprintf = require('util').format;
const defaults = require('./defaults');
const openFile = require('fs').createWriteStream;
const sqlLog = openFile(path.resolve(__dirname, '..', 'log', 'sql.log'), {
  defaultEncoding: 'utf8', flags: 'a'
});

module.exports = Object.assign({}, defaults, {
  appLog: {
    name: 'PeerviewApp',
    streams: [{
      stream: process.stdout,
      level: 'debug'
    }],
    serializers: {
      req: function (request) {
        let query = url.parse(request.url, true).query;
        let params = Object.assign(request.params, request.body, query);
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
          params: params
        };
      },
      res: function (request, response) {
        return response;
      }
    }
  },
  server: {
    port: 3000,
  },
  frontEnd: {
    baseUrl: process.env.PEERSVIEW_BASEURL
  },
  db: {
    adapter: 'mysql',
    database: 'peersview-dev',
    host: 'peersview.c7iwtmdqxmmx.eu-west-1.rds.amazonaws.com',
    user: 'peersviewDev',
    password: 'peersview-dev',
    timezone: '+00:00',
    logging: function (s) {
      var line = sprintf('[%s] %s\n', new Date().toJSON(), s);
      sqlLog.write(line);
    }
  },
  cloudinary: {
    cloud_name: 'peersview-com',
    api_key: '384785884926317',
    api_secret: '6dCjA-9qZaQWOO9DTjOJrtx4ZC0'
  },
  sendGrid: {
    apiKey: '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'
  }
});
