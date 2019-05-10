'use strict';

/**
 * Development environment config of any configuration required to setup
 * the application which includes db, etc for developer purposes.
 */
const path = require('path');
const url = require('url');
const bformat = require('bunyan-format');
const sprintf = require('util').format;
const defaults = require('./defaults');
const openFile = require('fs').createWriteStream;
const sqlLog = openFile(path.resolve(__dirname, '..', 'log', 'sql.log'), {
  defaultEncoding: 'utf8', flags: 'a'
});
const formatOut = bformat({
  outputMode: 'short'
});

module.exports = Object.assign({}, defaults, {
  appLog: {
    name: 'PeerviewApp',
    streams: [{
      stream: formatOut,
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
      statusCode: function (response) {
        return response.statusCode;
      }
    }
  },
  server: {
    port: 3000,
  },
  frontEnd: {
    baseUrl: 'http://localhost:4200'
  },
  db: {
    adapter: 'mysql',
    database: 'peersview',
    host: 'localhost',
    user: 'root',
    password: '',
    timezone: '+00:00',
    logging: function (s) {
      let line = sprintf('[%s] %s\n', new Date().toJSON(), s);
      /*sqlLog.write(line);*/
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
