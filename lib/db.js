'use strict';

const Sequelize = require('sequelize');
const debug = require('util')
  .debuglog('dbimport');
const models = require(__dirname + '/../data-models');
let config = require(__dirname + '/../config').db;
let model;

let db = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.adapter,
  dialectOptions: config.dialectOptions,
  pool: config.pool,
  timezone: config.timezone,
  maxConcurrentQueries: config.maxConcurrentQueries,
  logging: config.logging,
});

for (var modelName in models) {
  debug('Importing model "%s" from location "%s"',
    modelName, models[modelName]);
  model = db.import(models[modelName]);
  db.models[model.name] = model;
}

for (model in db.models) {
  debug('Defining associations for model "%s" (%s)',
    model, db.models[model]);
  if (typeof db.models[model].associate === 'function') {
    db.models[model].associate(db.models);
  }
}

module.exports = db;
