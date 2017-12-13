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

module.exports = Object.assign({}, defaults, {});
