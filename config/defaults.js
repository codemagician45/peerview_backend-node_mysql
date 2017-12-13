'use strict';

/**
 * Default config of any configuration required to setup
 * the application which includes db, etc.
 */

module.exports = {
  appLog: {
    name: 'WashingtonApp',
    streams: [{
      stream: process.stdout,
      level: 'info'
    }]
  },
  server: {
    port: process.env.PORT || process.env.PEERSVIEW_PORT,
  },
  db: {
    adapter: process.env.PEERSVIEW_DB_ADAPTER,
    host: process.env.PEERSVIEW_DB_HOST,
    user: process.env.PEERSVIEW_DB_USER,
    password: process.env.PEERSVIEW_DB_PASSWORD,
    database: process.env.PEERSVIEW_DATABASE,
    port: process.env.PEERSVIEW_DB_PORT,
    timezone: process.env.PEERSVIEW_DB_TIMEZONE,
    dialectOptions: {},
    // pool: {
    //   idle: ~~process.env.PEERSVIEW_DB_MAX_IDLE_TIME || 2 * 1000,
    //   min: ~~process.env.PEERSVIEW_DB_MIN_CONNECTIONS || 10,
    //   max: ~~process.env.PEERSVIEW_DB_MAX_CONNECTIONS || 20,
    //   evict: ~~process.env.PEERSVIEW_DB_EVICT_STALE || 60 * 1000
    // },
    logging: false
  }
};
