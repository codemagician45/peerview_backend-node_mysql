'use strict';

const ls = require('fs').readdirSync;
let files = ls(__dirname)
.filter(function (fd) {
  let parts = fd.split('.');
  // Filter tmp, hidden, and self
  if (fd.charAt(0) === '#'
      || fd.charAt(0) === '.'
      || fd === 'index.js') {
    return false;
  }
  if (parts.length > 1
      && parts[parts.length - 1].substr(0, 2) !== 'js') {
    return false;
  } else {
    return true;
  }
});

files.forEach(function (file) {
  // Remove .js & .json
  var fd = file.split('.')[0];

  // Turn-hyphens into camelCase
  let words = fd.match(/\w+/gi);
  let name = words.shift();
  let _cur;
  while ((_cur = words.shift())) {
    _cur = _cur[0].toUpperCase() + _cur.substr(1);
    name += _cur;
  }
  module.exports[name] = require('./' + file);
});
