'use strict';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const config = require(__dirname + '/config');
const sprintf = require('util').format;
const log = require('bunyan').createLogger(config.appLog);

if (cluster.isMaster && !process.env.SINGLE_PROCESS) {
  log.info('Master Process is online');
  for (let w = 0; w < numCPUs; w++) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    log.error({pid: worker.process.pid}, 'Worker died');
    cluster.fork();
  });

  cluster.on('online', function (worker) {
    log.info({pid: worker.process.pid}, 'New Worker online');
  });
} else {
  let api = require(__dirname + '/api');
  process.nextTick(function () {
    api.listen(config.server.port, function () {
      log.info(sprintf('Server accepting requests on port %d',
        config.server.port));
    });
  });
}

process.on('uncaughtException', function psUncaughtException (error) {
  log.fatal({err: error}, 'Uncaught Exception. Killing process now.');
  process.kill(1);
});
